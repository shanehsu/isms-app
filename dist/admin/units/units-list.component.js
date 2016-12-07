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
const router_1 = require('@angular/router');
// Services
const unit_service_1 = require('./../../services/unit.service');
let UnitsListComponent = class UnitsListComponent {
    constructor(router, route, unitService) {
        this.router = router;
        this.route = route;
        this.unitService = unitService;
        this.units = [];
    }
    ngOnInit() {
        // 取得所有單位
        this.unitService.units()
            .then(units => this.units = units)
            .catch(console.error);
    }
    new() {
        this.unitService.new()
            .then(newUnitID => this.router.navigate([newUnitID], { relativeTo: this.route }))
            .catch(console.error);
    }
    edit(unitID) {
        this.router.navigate([unitID], { relativeTo: this.route });
    }
    delete(unitID) {
        this.unitService.delete(unitID)
            .then(() => this.unitService.units()
            .then(units => this.units = units)
            .catch(console.error))
            .catch(console.error);
    }
};
UnitsListComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, unit_service_1.UnitService])
], UnitsListComponent);
exports.UnitsListComponent = UnitsListComponent;
//# sourceMappingURL=units-list.component.js.map