import {Component, OnInit} from 'angular2/core';
import {FormService}       from './../services/form.service'
import {Form}              from './../types/types'

@Component({
  selector: 'isms-form',
  templateUrl: '/app/isms-form/form-index.template.html',
  providers: [FormService]
})

export class FormIndexComponent implements OnInit {
  private _forms: Form[]
  
  refresh() {
    this._formService.forms()
        .then(forms => this._forms = forms)
        .catch(console.error)
  }
  
  ngOnInit() {
    this.refresh()
  }
  
  fill(id: string): void {
    
  }
  
  constructor(private _formService: FormService) {}
}
