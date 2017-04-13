import {
  Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef,
  ViewContainerRef, ReflectiveInjector, Compiler, NgModule, ModuleWithComponentFactories
} from '@angular/core'
import { NgClass, CommonModule } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router'
import { RecordService } from './../services/record.service'
import { FormService } from './../services/form.service'
import { MeService } from './../services/me.service'
import { Record, Signature, Field } from './../types/types'

@Component({
  template: `
  <h3 class="ui header">ID</h3>
  <div><pre>{{id | json}}</pre></div>
  
  <table id="record_display" class="ui table">
    <tbody>
      <tr *ngFor="let field of merged">
        <th>{{field.title}}</th>
        <td>
          <p *ngIf="field.value && !field.value.titles && !field.value.selectedValues">{{field.value}}</p>
          <p *ngIf="field.value && ( field.value.selectedValues || field.value.titles)">
            <record-data-display [(ngModel)]="field.value"></record-data-display>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <h3 class="ui header">簽核狀況</h3>
  <table class="ui table">
    <tbody>
      <tr *ngIf="record && record.signatures && this.userId">
        <td *ngIf="record.status == 'declined' && record.signatures[0].personnel == userId">
          <button class="ui teal button" (click)="update()">重新填寫</button>
        </td>
        <td *ngFor="let signature of record.signatures">
          <div class="ui list">
            <div *ngIf="signature.signed" class="item">
              <i class="user icon"></i>
              <div class="content">{{signature.name}}</div>
            </div>
            <div *ngIf="signature.signed" class="item">
              <i class="calendar icon"></i>
              <div class="content">{{signature.timestamp | date}}</div>
            </div>
            <div class="ui form" *ngIf="canSign(signature)">
              <button type="button" class="ui green button"
                [class.loading]="isSigning" (click)="sign()">簽章</button>
              <button type="button" class="ui red button"
                [class.loading]="isReturning" (click)="decline()">退回</button>
            </div>
            <div *ngIf="!signature.signed && !canSign(signature)" class="item">
              <i class="user icon"></i>
              <div class="content">{{signature.name}}</div>
            </div>
            <div *ngIf="!signature.signed && !canSign(signature)" class="item">
              <i class="delete icon"></i>
              <div class="content">尚未簽核</div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="ui button" (click)="showTemplated()">表格版</button>
  `,
  styles: [
    '#record_display th:first-child { padding: .78571429em; width: 8em; }',
    '#record_display > tbody > tr { vertical-align: initial; }',
    '#record_display > tbody > tr > th { color: initial; }',
  ]
})

export class RecordComponent implements OnInit {
  private userId: string
  private id: string
  private schema: Field[] | null
  private record: Record | null
  private merged: any | null

  private isSigning: boolean = false
  private isReturning: boolean = false

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private recordService: RecordService,
    private meSerivce: MeService,
    // 動態元件
    private viewContainer: ViewContainerRef,
    private compiler: Compiler) { }
  async ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.schema = null
    this.record = null
    this.merged = []

    this.meSerivce.user.subscribe(user => {
      if (user) this.userId = user.id
    })

    // 載入資料
    this.record = await this.recordService.record(this.id)
    let form = await this.formService.form(this.record.formId, "Filling", this.record.revisionNumber)
    this.schema = form.revision.fields

    // 合併資料
    function get_data(field: Field, content: any) {
      switch (field.type) {
        case 'shortText':
        case 'longText':
          return content
        case 'date':
          let formatter = new Intl.DateTimeFormat()
          let dateValue = new Date(content)
          return formatter.format(dateValue)
        case 'time':
          let timeValue = content
          return `${timeValue.hour} 時 ${timeValue.minute} 分`
        case 'options':
          type OptionValueType = { [optionId: string]: { values: any, selected: boolean } }
          let optionValue: OptionValueType = content
          let value = {
            selectedValues: [],
            nestedValues: []
          }
          for (let _option of field.metadata.options) {
            let option = <{ fields: Field[], value: string, id: string }>_option
            if (!optionValue[option.id].selected) { continue }

            let v = optionValue[option.id].values
            value.selectedValues.push(option.value)
            option.fields = option.fields.map(f => new Field(f))
            value.nestedValues.push(merge(option.fields, v))
          }

          return value
        case 'table':
          let columns: Field[] = field.metadata.fields.map(field => new Field(field))
          let rows: { [columnId: string]: any }[] = content

          return {
            titles: columns.map(field => field.name),
            values: rows.map(row => {
              // row is field id => data
              let data = []
              for (let column of columns) {
                data.push(get_data(column, row[column.id]))
              }

              return data
            })
          }
      }
    }
    function merge(schema: Field[], contents: any) {
      let r = []
      for (let field of schema) {
        let result: any = {
          title: field.name,
          value: get_data(field, contents[field.id])
        }
        r.push(result)
      }
      return r
    }

    this.merged = merge(this.schema, this.record.contents)
  }
  canSign(signature: Signature): boolean {
    if (signature.personnel == this.userId && !signature.signed && this.record.status == 'awaiting_review') {
      return true
    }
    return false
  }
  sign(): void {
    this.isSigning = true
    this.recordService.sign(this.id).then(() => {
      this.isSigning = false
      this.ngOnInit()
    })
  }
  async decline() {
    try {
      this.isReturning = true
      await this.recordService.return(this.record.id)
      this.router.navigate(['..'], { relativeTo: this.route })
    } catch (err) {
      console.error('發生錯誤，無法退回')
    }
  }
  update() {
    this.router.navigate(['../update/', this.id], { relativeTo: this.route })
  }
  async showTemplated() {
    let record = this.record
    let form = await this.formService.form(record.formId, "Filling", record.revisionNumber)
    let template = form.revision.template

    // 動態元件
    let metadata = { template: template }
    const decoratedCmp = Component(metadata)(class {
      private record: Record
      private rendered: boolean
      constructor() {
        this.record = record
        this.rendered = false
      }
      ngAfterViewInit() { this.rendered = true }
    })
    const decoratedModule = NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })(class { })

    let componentFactory = await this.compiler.compileModuleAndAllComponentsAsync(decoratedModule)
      .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
        return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
      })
    // 加入 View Container 中
    let injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.parentInjector)
    let createdComponent = this.viewContainer.createComponent(componentFactory, undefined, injector, [])
    let intervalId = window.setInterval(() => {
      if (createdComponent.instance.rendered) {
        window.clearInterval(intervalId)
        let element = createdComponent.location.nativeElement as HTMLElement

        let isolationAttribute = ""
        for (var i = 0; i < element.attributes.length; i++) {
          let attr = element.attributes.item(i)
          if (attr.name.startsWith('_nghost-')) {
            isolationAttribute = attr.name.substr(8)
          }
        }

        let applyingCssRules: string[] = []

        // 尋找 CSS Stylesheet
        for (let i = 0; i < window.document.styleSheets.length; i++) {
          let stylesheet = window.document.styleSheets.item(i) as CSSStyleSheet
          console.dir(stylesheet)
          if (!stylesheet.cssRules) {
            continue
          }
          for (let i = 0; i < stylesheet.cssRules.length; i++) {
            let rule = stylesheet.cssRules.item(i)
            if (rule.cssText.includes('_ngcontent-' + isolationAttribute) || rule.cssText.includes('_nghost-' + isolationAttribute)) {
              let ruleText = rule.cssText
              console.log(ruleText)
              applyingCssRules.push(ruleText)
            }
          }
        }

        let cssText = applyingCssRules.reduce((text, rule) => text += rule, "<style>")
        cssText += "</style>"

        let renderedHtml = element.innerHTML
        window.open('data:text/html;charset=UTF-8,' + `<div _nghost-${isolationAttribute}>${renderedHtml}${cssText}</div>`)

        // createdComponent.hostView.detach()
        // createdComponent.destroy()
      }
    }, 100)
  }
}
