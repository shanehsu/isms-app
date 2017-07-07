// Angular 2
import { Component, OnInit } from '@angular/core'

// 路由器
import { Router, ActivatedRoute } from '@angular/router'

// 服務
import { FormService } from './../../services/form.service'

// 基本型態
import { Form } from './../../types/types'

enum State {
  Normal = 1,
  Deleting = 2,
  Error = 3
}

@Component({
  template: `
  <div class="ui one column grid">
    <form class="ui form right aligned column">
      <button type="button" class="ui right floated blue labeled icon button" [class.loading]="isCreating" (click)="create()">
        <i class="plus icon"></i>
        新增表單
      </button>
    </form>
  </div>
  <table class="ui striped table">
    <thead>
      <tr>
        <th>表單 ID</th>
        <th>表單</th>
        <th style="width: 12em;">動作</th>
      </tr>
    </thead>
    <tbody>
      <tr style="height: 8em;" *ngIf="!loading && units && !loadingError && forms.length == 0">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="4">
          無資料
        </td>
      </tr>
      <tr style="height: 8em;" *ngIf="loading">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="4">
          載入中 <i class="spinner loading icon"></i>
        </td>
      </tr>
      <tr style="height: 8em;" *ngIf="!loading && loadingError">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160); margin-bottom: 0em;" colspan="4">
          <p>
            載入錯誤 <i class="warning sign icon"></i>
          </p>
          <a style="font-size: 0.5em; color: #7e8bb3;" class="link" (click)="reload()">重新載入？</a>
        </td>
      </tr>
      <tr *ngFor="let form of forms">
        <td>{{form.identifier}}</td>
        <td>{{form.name}}</td>
        <td style="text-align: center;">
          <div class="small ui buttons">
            <button type="button" class="ui basic teal button" (click)="edit(form.id)">編輯</button>
            <button type="button" class="ui basic red button" (click)="delete(form.id)" [class.loading]="states[form.id] != 1">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `
})

export class FormsListComponent implements OnInit {
  private isCreating: boolean
  private forms: Form[]

  private loading: boolean
  private loadingError: any | null

  private states: { [formId: string]: State }

  constructor(private formService: FormService,
    private router: Router,
    private route: ActivatedRoute) {
    this.isCreating = false
  }

  reload() {
    this.states = {}
    this.loading = true
    this.formService.forms("Management")
      .then(forms => {
        forms.forEach(form => this.states[form.id] = State.Normal)
        this.forms = forms
        this.loading = false
      })
      .catch(err => {
        this.loading = false
        this.loadingError = err
      })
  }

  ngOnInit() {
    this.reload()
  }

  create() {
    this.isCreating = true
    this.formService.create()
      .then(id => {
        this.edit(id)
      })
      .catch(console.error)
  }

  edit(id: string) {
    this.router.navigate([id], { relativeTo: this.route })
  }

  async delete(id: string) {
    this.states[id] = State.Deleting
    try {
      await this.formService.delete(id)
      let index = this.forms.findIndex($0 => $0.id == id)
      this.forms.splice(index, 1)
      delete this.states[id]
    } catch (err) {
      console.dir(err)
      this.states[id] = State.Error
    }
  }
}
