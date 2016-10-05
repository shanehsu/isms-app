import {Component, OnInit}         from '@angular/core'
import {FormService}               from './../services/form.service'
import {Form}                      from './../types/types'

@Component({
  template: `
  <h2 class="ui header">瀏覽表單</h2>
  <table class="ui striped basic table">
    <thead>
      <tr>
        <th style="width: 10em;">表單 ID</th>
        <th style="">表單</th>
        <th class="center aligned" style="width: 10em;">動作</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let form of _forms">
        <td>{{form.identifier}}</td>
        <td><h4 class="ui header">{{form.name}}</h4></td>
        <td class="center aligned selectable"><a [routerLink]="form._id">填寫</a></td>
      </tr>
    </tbody>
  </table>`,
})

export class FormListComponent implements OnInit {
  private _forms: Form[]
  
  refresh() {
    this.formService.fillableForms()
        .then(forms => this._forms = forms)
        .catch(console.error)
  }
  
  ngOnInit() {
    this.refresh()
  }
  
  constructor(private formService: FormService) {}
}
