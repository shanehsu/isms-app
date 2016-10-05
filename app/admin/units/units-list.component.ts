// Angular 2
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

// Services
import { UnitService } from './../../services/unit.service'
import { UserService } from './../../services/user.service'

// Interfaces
import { Unit } from './../../types/unit'

@Component({
  template: `
  <div class="ui one column grid">
    <form class="ui form right aligned column">
      <button type="button" class="ui right floated blue labeled icon button" (click)="new()">
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
        <th class="on tablet on small screen on large screen">母單位</th>
        <th class="on large screen">子單位</th>
        <th class="on tablet on small screen on large screen">主管</th>
        <th class="on small screen on large screen">文管</th>
        <th class="on large screen">承辦人</th>
        <th style="width: 12em;">動作</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let unit of units">
        <td>{{unit.name}}</td>
        <td class="on tablet on small screen on large screen">{{unit.identifier}}</td>
        <td class="on tablet on small screen on large screen">{{unit.parentUnit | unitName:'silent'}}</td>
        <td class="on large screen">
          <p *ngFor="let childUnit of unit.childUnits">{{childUnit | unitName:'silent'}}</p>
        </td>
        <td class="on tablet on small screen on large screen">{{unit.manager | userName}}</td>
        <td class="on small screen on large screen">{{unit.docsControl | userName}}</td>
        <td class="on large screen">
          <p *ngFor="let agent of unit.agents">{{agent | userName}}</p>
        </td>
        <td style="text-align: center;">
          <div class="small ui buttons">
            <button type="button" class="ui basic teal button" (click)="edit(unit.id)">編輯</button>
            <button type="button" class="ui basic red button" (click)="delete(unit.id)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `
})

export class UnitsListComponent implements OnInit {
  private units: Unit[];

  constructor(private router: Router, private route: ActivatedRoute, private unitService: UnitService) {
    this.units = [];
  }

  ngOnInit(): void {
    // 取得所有單位
    this.unitService.units()
      .then(units => this.units = units)
      .catch(console.error)
  }

  new(): void {
    this.unitService.new()
      .then(newUnitID => this.router.navigate([newUnitID], { relativeTo: this.route }))
      .catch(console.error)
  }

  edit(unitID: string): void {
    this.router.navigate([unitID], { relativeTo: this.route });
  }

  delete(unitID: string): void {
    this.unitService.delete(unitID)
      .then(() => this.unitService.units()
        .then(units => this.units = units)
        .catch(console.error))
      .catch(console.error)
  }
}