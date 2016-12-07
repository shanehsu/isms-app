"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const form_service_1 = require('./../services/form.service');
let FormListComponent = class FormListComponent {
    constructor(formService) {
        this.formService = formService;
    }
    refresh() {
        this.formService.fillableForms()
            .then(forms => this._forms = forms)
            .catch(console.error);
    }
    ngOnInit() {
        this.refresh();
    }
};
FormListComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [form_service_1.FormService])
], FormListComponent);
exports.FormListComponent = FormListComponent;
//# sourceMappingURL=form-list.component.js.map