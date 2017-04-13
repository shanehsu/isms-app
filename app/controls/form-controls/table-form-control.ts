// Angular 2
import { Input, Output, Component, EventEmitter, OnInit } from '@angular/core'

import { Directive, Provider, forwardRef, Self } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms'

import { RecordService } from './../../services/record.service'

// THIS WILL NOT EMIT VALUE BY DEFAULT, NEED TO BIND TO (change) EVENT!

@Component({
  selector: 'form-control[type=table]',
  template: `
  <table class="ui celled striped table">
    <thead>
      <tr>
        <th style="width: 3em; text-align: right;">#</th>
        <th *ngFor="let item of _metadata.fields">{{item.name}}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let record of _dataModel; let recordIndex = index">
        <td style="text-align: right;">{{recordIndex + 1}}</td>
        <td *ngFor="let item of _metadata.fields; let fieldIndex = index">
          <ng-template [ngIf]="item.type == 'shortText'">
            <div class="field">
              <form-control type="text" row="single" [(ngModel)]="_dataModel[recordIndex][item.id]"></form-control>
            </div>
          </ng-template>
          
          <ng-template [ngIf]="item.type == 'longText'">
            <div class="field">
              <form-control type="text" row="multi" [(ngModel)]="_dataModel[recordIndex][item.id]"></form-control>
            </div>
          </ng-template>
          
          <ng-template [ngIf]="item.type == 'date'">
            <div class="field">
              <form-control type="date" [(ngModel)]="_dataModel[recordIndex][item.id]"></form-control>
            </div>
          </ng-template>
          
          <ng-template [ngIf]="item.type == 'time'">
            <div class="field">
              <form-control type="time" [(ngModel)]="_dataModel[recordIndex][item.id]"></form-control>
            </div>
          </ng-template>
          
          <ng-template [ngIf]="item.type == 'options'">
            <ng-template [ngIf]="item.metadata.presentation == 'radio'">
              <div class="field">
                <form-control type="options" presentation="single" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][item.id]"></form-control>
              </div>
            </ng-template>
            <ng-template [ngIf]="item.metadata.presentation == 'checkbox'">
              <div class="field">
                <form-control type="options" presentation="multi" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][item.id]"></form-control>
              </div>
            </ng-template>
            <ng-template [ngIf]="item.metadata.presentation == 'select'">
              <div class="field">
                <form-control type="options" presentation="dropdown" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][item.id]"></form-control>
              </div>
            </ng-template>
          </ng-template>
          
          <ng-template [ngIf]="item.type == 'table'">
            <div class="field">
              <form-control type="table" [metadata]="item.metadata" [(ngModel)]="_dataModel[recordIndex][item.id]"></form-control>
            </div>
          </ng-template>
        </td>
      </tr>
    </tbody>
    <tfoot class="full-width">
      <tr>
        <th [attr.colspan]="_metadata.fields.length + 1">
          <button type="button" class="ui right floated blue labeled icon button" (click)="new()">
            <i class="plus icon"></i>
            新增一筆資料
          </button>
        </th>
      </tr>
    </tfoot>
  </table>`
})

export class TableFormControl implements ControlValueAccessor {
  private _onChanged = (_) => { }
  private _onTouched = () => { }
  private cd: NgModel

  @Input('metadata') _metadata: any

  private _dataModel: any[]

  constructor( @Self() cd: NgModel, private recordService: RecordService) {
    this.cd = cd
    cd.valueAccessor = this
  }

  // 與 Value Accessor 有關的

  // 從 Value Accessor 接收資料
  writeValue(value: any[]): void {
    this._dataModel = value
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChanged = fn
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }

  new(): void {
    this._dataModel.push(this.recordService.emptyRecordForFields(this._metadata.fields))
  }
}
