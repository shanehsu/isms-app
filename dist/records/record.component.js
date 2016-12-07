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
const router_1 = require('@angular/router');
const record_service_1 = require('./../services/record.service');
function merge(schema, data) {
    for (var field of schema) {
        for (var key in field) {
            if (key == 'metadata') {
                field.metadata = JSON.parse(field.metadata);
            }
        }
    }
    // 開始工作囉！
    if (schema.length != data.length) {
        console.error(`合併欄位資料與欄位形式的時候發生錯誤，資料有 ${data.length} 個欄位，但是形式有 ${data.length} 個欄位。`);
        return [];
    }
    else {
        let merge_algorithm = function (schema, data) {
            let getData = function (field, data) {
                switch (field.type) {
                    case 'shortText':
                    case 'longText':
                        return data;
                    case 'time':
                        let time = data;
                        return `${time.hour} 時 ${time.minute} 分`;
                    case 'date':
                        let date = data;
                        return Intl.DateTimeFormat().format(new Date(date));
                    case 'options':
                        let optionData = data;
                        let optionFieldDisplayData = {
                            selectedValues: [],
                            nestedValues: []
                        };
                        let fieldMetadata = field.metadata;
                        optionData.selected.forEach((value, index) => {
                            if (value) {
                                optionFieldDisplayData.selectedValues.push(fieldMetadata.options[index].value);
                                let nestedFieldValues = optionData.values[index];
                                let metadatas = nestedFieldValues.map((nestedValue, nestedFieldIndex) => {
                                    return merge_algorithm(fieldMetadata.options[index].fields[nestedFieldIndex], nestedValue);
                                });
                                optionFieldDisplayData.nestedValues.push(metadatas);
                            }
                        });
                        return optionFieldDisplayData;
                    case 'table':
                        let tableFieldData = data;
                        let tableFieldDisplayData = {
                            titles: [],
                            values: []
                        };
                        let tableFieldMetadata = field.metadata;
                        tableFieldDisplayData.titles = tableFieldMetadata.fields.map(field => field.name);
                        tableFieldData.forEach((rowData, i) => {
                            let row = [];
                            rowData.forEach((cellData, j) => {
                                row.push(getData(tableFieldMetadata.fields[j], cellData));
                            });
                            tableFieldDisplayData.values.push(row);
                        });
                        return tableFieldDisplayData;
                }
            };
            return {
                title: schema.name,
                value: getData(schema, data)
            };
        };
        let metadata = [];
        for (let i = 0; i < schema.length; i++) {
            let tSchema = schema[0];
            let tData = data[0];
            metadata.push(merge_algorithm(tSchema, tData));
        }
        return metadata;
    }
}
let RecordComponent = class RecordComponent {
    constructor(route, recordService) {
        this.route = route;
        this.recordService = recordService;
        this.isSigning = false;
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.schema = undefined;
        this.record = undefined;
        this.data = undefined;
        this.merged = undefined;
        // 載入資料
        this.recordService.record(this.id).then(record => {
            this.recordService.schemaForRevision(record.form.id, record.revision.id).then(schema => {
                this.schema = schema;
                this.record = record;
                this.data = record.data;
                this.merged = merge(this.schema, this.data);
            });
        });
    }
    canSign(signature) {
        if (signature.personnel.id == localStorage.getItem('userid') && !signature.signed) {
            return true;
        }
        return false;
    }
    sign() {
        this.isSigning = true;
        this.recordService.sign(this.id).then(() => {
            this.isSigning = false;
            this.ngOnInit();
        });
    }
};
RecordComponent = __decorate([
    core_1.Component({
        template: `
  <h3 class="ui header">ID</h3>
  <div><pre>{{id | json}}</pre></div>
  
  <table id="record_display" class="ui table">
    <tbody>
      <tr *ngFor="let field of merged">
        <th>{{field.title}}</th>
        <td>
          <p *ngIf="field.value && !field.value.titles && !field.value.selectedValues">{{field.value}}</p>
          <p *ngIf="field.value.titles || field.value.titles">
            <record-data-display [(ngModel)]="field.value"></record-data-display>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
  <h3 class="ui header">簽核狀況</h3>
  <table class="ui table">
    <tbody>
      <tr *ngIf="record && record.signatures">
        <td *ngFor="let signature of record.signatures">
          <div class="ui list">
            <div class="item">
              <i class="user icon"></i>
              <div class="content">{{signature.personnel.name}}</div>
            </div>
            <div class="item">
              <i class="users icon"></i>
              <div class="content">{{signature.unit}} 的 {{signature.role}}</div>
            </div>
            <div *ngIf="signature.signed" class="item">
              <i class="calendar icon"></i>
              <div class="content">{{signature.timestamp | date}}</div>
            </div>
            <button *ngIf="canSign(signature)" type="button" class="ui button" (click)="sign()" [class.loading]="isSigning">簽章</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  
  <h3 class="ui header">Merged</h3>
  <div><pre>{{merged | json}}</pre></div>
  <h3 class="ui header">Schema</h3>
  <div><pre>{{schema | json}}</pre></div>
  <h3 class="ui header">Record</h3>
  <div><pre>{{record | json}}</pre></div>
  <h3 class="ui header">Record Data</h3>
  <div><pre>{{data | json}}</pre></div>
  `,
        styles: [
            '#record_display th:first-child { width: 12em; }',
            '#record_display > tbody > tr { vertical-align: initial; }',
            '#record_display > tbody > tr > th { color: initial; }'
        ]
    }), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, record_service_1.RecordService])
], RecordComponent);
exports.RecordComponent = RecordComponent;
//# sourceMappingURL=record.component.js.map