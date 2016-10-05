// Angular 2
import {Component, OnInit} from '@angular/core'

// 路由器
import {Router, ActivatedRoute} from '@angular/router'

// 服務
import {FormService} from './../../services/form.service'

// 基本型態
import {Form} from './../../types/types'

@Component({
  template: `
  <div class="ui one column grid">
    <form class="ui form right aligned column">
      <button type="button" class="ui right floated blue labeled icon button" (click)="new()">
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
      <tr *ngFor="let form of _forms">
        <td>{{form.identifier}}</td>
        <td>{{form.name}}</td>
        <td style="text-align: center;">
          <div class="small ui buttons">
            <button type="button" class="ui basic teal button" (click)="edit(form._id)">編輯</button>
            <button type="button" class="ui basic red button" (click)="delete(form._id)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `
})

export class FormsListComponent implements OnInit {
  private _forms: Form[]
  
  refresh() {
    this.formService.forms()
        .then(forms => this._forms = forms)
        .catch(console.error)
  }
  
  ngOnInit() {
    this.refresh()
  }
  
  new() {
    this.formService.new()
        .then(id => this.router.navigate([id], {relativeTo: this.route}))
        .catch(console.error)
  }
  
  edit(id: string) {
    this.router.navigate([id], {relativeTo: this.route})
  }
  
  delete(id: string) {
    this.formService.delete(id)
        .then(() => this.refresh())
        .catch(console.error)
  }
  
  constructor(private formService: FormService,
              private router: Router,
              private route: ActivatedRoute) {}
}
