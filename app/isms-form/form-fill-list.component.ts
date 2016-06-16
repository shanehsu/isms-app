import {Component, OnInit}         from '@angular/core'
import {FormService}               from './../services/form.service'
import {Form}                      from './../types/types'

import {Router, RouteSegment}      from '@angular/router'

@Component({
  selector: 'isms-form',
  template: `<div class="container">
  <table class="table table-striped">
    <thead>
      <tr>
        <th style="width: 20%">表單 ID</th>
        <th style="width: 60%">表單</th>
        <th style="width: 20%">動作</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="#form of _forms">
        <td>{{form.identifier}}</td>
        <td>{{form.name}}</td>
        <td><a (click)="fill(form._id)">填寫</a></td>
      </tr>
    </tbody>
  </table>
</div>`,
  providers: [FormService],
  directives: []
})

export class FormFillListComponent implements OnInit {
  private _forms: Form[]
  
  refresh() {
    this.formService.forms()
        .then(forms => this._forms = forms)
        .catch(console.error)
  }
  
  ngOnInit() {
    this.refresh()
  }
  
  fill(id: string): void {
    this.router.navigate([id], this.routeSegment)
  }
  
  constructor(private formService: FormService, private router: Router, private routeSegment: RouteSegment) {}
}
