import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { UnitService } from './../../services/unit.service'
import { UserService } from './../../services/user.service'
import { MessageService } from './../../services/message.service'
import { Unit } from './../../types/unit'

enum UnitState {
  Normal = 1,
  Deleting = 2,
  Errored = 3
}

@Component({
  template: `
  <div class="ui one column grid">
    <form class="ui form right aligned column">
      <button type="button" class="ui right floated blue labeled icon button" (click)="create()" [class.loading]="creating">
        <i class="plus icon"></i>
        新增單位
      </button>
    </form>
  </div>
  <table class="ui unstackable striped table">
    <thead>
      <tr>
        <th>單位</th>
        <th class="on tablet on small screen on large screen">編號</th>
        <th style="width: 12em;">動作</th>
      </tr>
    </thead>
    <tbody>
    <!-- 訊息 -->
      <tr style="height: 8em;" *ngIf="!loading && units && !loadingError && units.length == 0">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="4">
          無資料
        </td>
      </tr>
      <tr style="height: 8em;" *ngIf="loading">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160);" colspan="4">
          載入中 <i class="spinner loading icon"></i>
        </td>
      </tr>
      <tr style="height: 8em;" *ngIf="!loading && loadingError">
        <td style="text-align: center; font-size: 1.4em; color: rgb(160, 160, 160); margin-bottom: 0em;" colspan="4">
          <p>
            載入錯誤 <i class="warning sign icon"></i>
          </p>
          <a style="font-size: 0.5em; color: #7e8bb3;" class="link" (click)="reload()">重新載入？</a>
        </td>
      </tr>
      <tr *ngFor="let unit of units">
        <td>{{unit.name}}</td>
        <td class="on tablet on small screen on large screen">{{unit.identifier}}</td>
        <td style="text-align: center;">
          <div class="small ui buttons">
            <button type="button" class="ui basic teal button" (click)="edit(unit.id)">編輯</button>
            <button type="button" class="ui basic red button" (click)="delete(unit.id)" [class.loading]="states[unit.id] == 2">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `
})

export class UnitsListComponent implements OnInit {
  // 載入狀態
  private loading: boolean
  private loadingError: any

  // 新增狀態
  private creating: boolean

  // 狀態（正常、刪除中、錯誤）
  private states: { [id: string]: UnitState }

  // 單位
  private units: Unit[]

  constructor(private router: Router, private route: ActivatedRoute, private unitService: UnitService, private messageService: MessageService) {
    this.units = [];
  }

  ngOnInit(): void {
    this.loading = false
    this.loadingError = null
    this.creating = false
    this.states = {}
    this.units = []

    this.reload()
  }
  /**
   * 重新載入單位
   */
  private async reload() {
    this.loading = true
    this.loadingError = null
    this.units = []
    this.states = {}

    try {
      this.units = await this.unitService.units()
      this.units.forEach(unit => this.states[unit.id] = UnitState.Normal)
    } catch (err) {
      this.loadingError = err
      this.messageService.error('網路錯誤', err.message ? err.message : '未知的錯誤，無法載入單位資訊。')
    }
    this.loading = false
  }

  private async create(): Promise<void> {
    this.creating = true
    try {
      let newUnitId = await this.unitService.create()
      console.dir(newUnitId)
      this.edit(newUnitId)
    } catch (err) {
      this.messageService.error('網路錯誤', err.message ? err.message : '未知的錯誤，無法創立新單位。')
    }
    this.creating = false
  }

  edit(unitId: string): void {
    this.router.navigate([unitId], { relativeTo: this.route })
  }

  async delete(unitId: string): Promise<void> {
    this.states[unitId] = UnitState.Deleting
    try {
      await this.unitService.delete(unitId)

      this.units.splice(this.units.findIndex(unit => unit.id == unitId), 1)
      delete this.states[unitId]
    } catch (err) {
      this.states[unitId] = UnitState.Errored
      this.messageService.error('網路錯誤', err.message ? err.message : '未知的錯誤，無法刪除單位。')
    }
  }
}