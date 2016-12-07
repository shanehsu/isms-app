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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const form_service_1 = require('./../services/form.service');
const record_service_1 = require('./../services/record.service');
const router_1 = require('@angular/router');
let FormComponent = class FormComponent {
    constructor(formService, recordService, route, debug) {
        this.formService = formService;
        this.recordService = recordService;
        this.route = route;
        this.debug = debug;
    }
    ngOnInit() {
        this.data = [];
        this.id = this.route.snapshot.params['id'];
        this.fields = [];
        this.recordService.schema(this.id).then(fields => {
            let parsedFields = fields.map(field => {
                field.metadata = JSON.parse(field.metadata);
                return field;
            });
            this.data = this.recordService.emptyRecordForFields(parsedFields);
            this.fields = parsedFields;
        }).catch(console.error);
    }
    submit() {
        this.recordService.upload(this.id, this.data).then(recordID => {
            console.dir(`已經建立紀錄：${recordID}`);
        }).catch(err => {
            console.error('無法建立表單紀錄');
            console.error(err);
        });
    }
};
FormComponent = __decorate([
    core_1.Component({
        template: `<div class="container">
    <div *ngIf="fields">
      <form class="ui form">
        <form-fields [fields]="fields" [(ngModel)]="data" name="fields"></form-fields>
        <div style="margin-top: 1em; text-align: right;">
          <button type="button" (click)="submit()" class="ui yellow button">送出</button>
        </div> 
      </form>
      
      <div class="ui raised segment" *ngIf="true || debug">
        <h2 class="ui header">除錯資訊</h2>
        <h3 class="ui header">欄位 JSON</h3>
        <pre>{{fields | json}}</pre>
      </div>
    </div>
    <div class="ui raised segment" *ngIf="!_nested && debug">
      <h2 class="card-title">除錯資訊</h2>
      <h3 class="card-subtitle text-muted">表單 JSON</h3>
      <pre>{{data | json}}</pre>
    </div>
  </div>`
    }),
    __param(3, core_1.Inject("app.debug")), 
    __metadata('design:paramtypes', [form_service_1.FormService, record_service_1.RecordService, router_1.ActivatedRoute, Object])
], FormComponent);
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map