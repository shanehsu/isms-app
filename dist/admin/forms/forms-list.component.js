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
// Angular 2
const core_1 = require('@angular/core');
// 路由器
const router_1 = require('@angular/router');
// 服務
const form_service_1 = require('./../../services/form.service');
let FormsListComponent = class FormsListComponent {
    constructor(formService, router, route) {
        this.formService = formService;
        this.router = router;
        this.route = route;
    }
    refresh() {
        this.formService.forms()
            .then(forms => this._forms = forms)
            .catch(console.error);
    }
    ngOnInit() {
        this.refresh();
    }
    new() {
        this.formService.new()
            .then(id => this.router.navigate([id], { relativeTo: this.route }))
            .catch(console.error);
    }
    edit(id) {
        this.router.navigate([id], { relativeTo: this.route });
    }
    delete(id) {
        this.formService.delete(id)
            .then(() => this.refresh())
            .catch(console.error);
    }
};
FormsListComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [form_service_1.FormService, router_1.Router, router_1.ActivatedRoute])
], FormsListComponent);
exports.FormsListComponent = FormsListComponent;
//# sourceMappingURL=forms-list.component.js.map