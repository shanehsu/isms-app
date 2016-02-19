// Angular 2
import {Component, OnInit} from 'angular2/core'

// 路由器
import {Router} from 'angular2/router'

// 服務
import {FormService} from './../../../services/form.service'

// 基本型態
import {Form} from './../../../types/types'

@Component({
  selector: 'form-list',
  templateUrl: '/app/admin/form-admin/form-list/form-list.template.html',
  providers: [FormService]
})

export class FormListComponent implements OnInit {
  private _forms: Form[]
  
  refresh() {
    this._formService.forms()
        .then(forms => this._forms = forms)
        .catch(console.error)
  }
  
  ngOnInit() {
    this.refresh()
  }
  
  new() {
    this._formService.new()
        .then(id => this._router.navigate(['FormDetail', {'id': id}]))
        .catch(console.error)
  }
  
  edit(id: string) {
    this._router.navigate(['FormDetail', {'id': id}])
  }
  
  delete(id: string) {
    this._formService.delete(id)
        .then(() => this.refresh())
        .catch(console.error)
  }
  
  constructor(private _formService: FormService,
              private _router: Router) {}
}
