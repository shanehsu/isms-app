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
let UnitDetailComponent = class UnitDetailComponent {
    constructor(router, route, unitService) {
        this.router = router;
        this.route = route;
        this.unitService = unitService;
    }
    ngOnInit() {
        // Get a placeholder Unit to get around the undefined key bug.
        this._unit = this.unitService.empty();
        this._unitUserIDs = [];
        this._freeUserIDs = [];
        this._freeUnitIDs = [];
        this._unitID = this.route.snapshot.params['id'];
        // Get the Unit from UnitService
        this.unitService.unit(this._unitID)
            .then(unit => this._unit = unit)
            .catch(console.error);
        this.unitService.usersInUnit(this._unitID)
            .then(userIDs => this._unitUserIDs = userIDs)
            .catch(console.error);
        this.unitService.freeUsers()
            .then(userIDs => this._freeUserIDs = userIDs)
            .catch(console.error);
        this.unitService.freeUnits(this._unitID)
            .then(unitIDs => this._freeUnitIDs = unitIDs)
            .catch(console.error);
    }
    ngAfterViewInit() {
        $('#update_button').popup({
            inline: true
        });
    }
    submit_name_and_identifier() {
        this.unitService.update(this._unit)
            .then(() => this.router.navigate(['..'], { relativeTo: this.route }))
            .catch(console.error);
    }
    relateUser(unitID, userID) {
        this.unitService.relateUser(unitID, userID)
            .then(() => {
            this.unitService.usersInUnit(this._unitID)
                .then(userIDs => this._unitUserIDs = userIDs)
                .catch(console.error);
            this.unitService.freeUsers()
                .then(userIDs => this._freeUserIDs = userIDs)
                .catch(console.error);
        })
            .catch(console.error);
    }
    removeUser(unitID, userID) {
        this.unitService.removeUser(unitID, userID)
            .then(() => {
            this.unitService.usersInUnit(this._unitID)
                .then(userIDs => this._unitUserIDs = userIDs)
                .catch(console.error);
            this.unitService.freeUsers()
                .then(userIDs => this._freeUserIDs = userIDs)
                .catch(console.error);
        })
            .catch(console.error);
    }
    assignRole(unitID, userID, role) {
        this.unitService.assignRole(unitID, userID, role)
            .then(() => {
            this.unitService.unit(this._unitID)
                .then(unit => this._unit = unit)
                .catch(console.error);
            this.unitService.usersInUnit(this._unitID)
                .then(userIDs => this._unitUserIDs = userIDs)
                .catch(console.error);
        })
            .catch(console.error);
    }
    deassignRole(unitID, userID, role) {
        this.unitService.deassignRole(unitID, userID, role)
            .then(() => {
            this.unitService.unit(this._unitID)
                .then(unit => this._unit = unit)
                .catch(console.error);
            this.unitService.usersInUnit(this._unitID)
                .then(userIDs => this._unitUserIDs = userIDs)
                .catch(console.error);
        })
            .catch(console.error);
    }
    relateParent(parentUnit, childUnit) {
        this.unitService.relateParent(parentUnit, childUnit)
            .then(() => {
            this.unitService.unit(this._unitID)
                .then(unit => this._unit = unit)
                .catch(console.error);
        }).catch(console.error);
    }
    removeParent(parentUnit, childUnit) {
        this.unitService.removeParent(parentUnit, childUnit)
            .then(() => {
            this.unitService.unit(this._unitID)
                .then(unit => this._unit = unit)
                .catch(console.error);
            this.unitService.freeUnits(this._unitID)
                .then(unitIDs => this._freeUnitIDs = unitIDs)
                .catch(console.error);
        }).catch(console.error);
    }
    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
};
UnitDetailComponent = __decorate([
    core_1.Component({
        template: `
  <div class="ui one column grid">
    <div class="column">
        <div class="ui padded raised segment">
        <h2 class="ui header">基本資訊</h2>

        <form class="ui form" (ngSubmit)="submit_name_and_identifier()" #unitForm="ngForm">
            <div class="field">
            <label>ID</label>
            <p>{{_unit.id}}</p>
            </div>
            <div class="field">
            <label>單位名稱</label>
            <input type="text" [(ngModel)]="_unit.name" name="name" required>
            </div>
            <div class="field">
            <label>單位編號</label>
            <input type="number" min="0" [(ngModel)]="_unit.identifier" name="title" required>
            </div>
            <div style="text-align: right;">
            <button type="button" class="ui basic button" (click)="cancel()">取消</button>
            <button type="submit" id="update_button" class="ui basic button" [class.green]="unitForm.form.valid" [class.red]="!unitForm.form.valid"
                [disabled]="!unitForm.form.valid" data-content="該按鈕只能更新單位名稱以及單位編號。">更新</button>
            </div>
        </form>
        </div>
    </div>
    <div class="column">
        <div class="ui two column grid">
        <div class="column">
            <div class="ui segments">
            <h2 class="ui top attached header">人員資訊</h2>
            <div class="ui attached segment">
                <h3 class="ui header">單位內</h3>
                <p *ngIf="_unitUserIDs.length == 0">單位內無人員</p>
                <div>
                <a class="link append-separator" data-separator="、" *ngFor="let userID of _unitUserIDs" (click)="removeUser(_unit.id, userID)">{{userID | userName}}</a>
                </div>
            </div>
            <div class="ui attached segment">
                <h3 class="ui header">無單位</h3>
                <div>
                <a class="link append-separator" data-separator="、" *ngFor="let userID of _freeUserIDs" (click)="relateUser(_unit.id, userID)">{{userID | userName}}</a>
                </div>
            </div>
            <div class="ui bottom attached info message">
                <p>點選以加入／移出單位</p>
            </div>
            </div>
        </div>
        <div class="column">
            <div class="ui segments">
            <h2 class="ui top attached header">主管</h2>
            <div class="ui attached segment" *ngIf="_unit.manager">
                目前由 <a class="link" (click)="deassignRole(_unit.id, _unit.manager, 'manager')">{{_unit.manager | userName}}</a> 任職
            </div>
            <div class="ui attached segment" *ngIf="!_unit.manager">
                <p *ngIf="_unitUserIDs.length == 0">單位內無人員</p>
                <div>
                <a class="link append-separator" data-separator="、" *ngFor="let userID of _unitUserIDs" (click)="assignRole(_unit.id, userID, 'manager')">{{userID | userName}}</a>
                </div>
            </div>
            <div class="ui bottom attached info message">
                <p *ngIf="_unit.manager">點選以解除職務</p>
                <p *ngIf="!_unit.manager">點選以指定職務</p>
            </div>
            </div>
        </div>
        <div class="column">
            <div class="ui segments">
            <h2 class="ui top attached header">文管</h2>
            <div class="ui attached segment" *ngIf="_unit.docsControl">
                目前由 <a class="link" (click)="deassignRole(_unit.id, _unit.docsControl, 'docsControl')">{{_unit.docsControl | userName}}</a> 任職
            </div>
            <div class="ui attached segment" *ngIf="!_unit.docsControl">
                <p *ngIf="_unitUserIDs.length == 0">單位內無人員</p>
                <div>
                <a class="link append-separator" data-separator="、" *ngFor="let userID of _unitUserIDs" (click)="assignRole(_unit.id, userID, 'docsControl')">{{userID | userName}}</a>
                </div>
            </div>
            <div class="ui bottom attached info message">
                <p *ngIf="_unit.docsControl">點選以解除職務</p>
                <p *ngIf="!_unit.docsControl">點選以指定職務</p>
            </div>
            </div>
        </div>
        <div class="column">
            <div class="ui segments">
            <h2 class="ui top attached header">承辦人</h2>
            <div class="ui attached segment" *ngIf="_unit.agents.length > 0">
                <h3 class="ui header">現任承辦人</h3>
                <div>
                <a class="link append-separator" data-separator="、" *ngFor="let agent of _unit.agents" (click)="deassignRole(_unit.id, agent, 'agent')">{{agent | userName}}</a>
                </div>
            </div>
            <div class="ui attached segment" *ngIf="_unit.agents.length != _unitUserIDs.length">
                <h3 class="ui header">非承辦人</h3>
                <div>
                <template ngFor let-userID [ngForOf]="_unitUserIDs">
                    <a class="link append-separator" data-separator="、" *ngIf="_unit.agents.indexOf(userID) < 0" (click)="assignRole(_unit.id, userID, 'agent')">{{userID | userName}}</a>
                </template>
                </div>
            </div>
            <div class="ui attached segment" *ngIf="_unitUserIDs.length == 0">
                <p>沒有人員在單位中</p>
            </div>
            <div class="ui bottom attached info message">
                <p>點選以指定／解除職務</p>
            </div>
            </div>
        </div>
        <div class="column">
            <div class="ui segments">
            <h2 class="ui top attached header">母單位</h2>
            <div class="ui attached segment" *ngIf="_unit.parentUnit">
                目前的母單位：<a class="link" (click)="removeParent(_unit.parentUnit, _unit.id)">{{_unit.parentUnit | unitName}}</a>
            </div>
            <div class="ui attached segment" *ngIf="!_unit.parentUnit">
                <a class="link append-separator" data-separator="、" *ngFor="let unitID of _freeUnitIDs" (click)="relateParent(unitID, _unit.id)">{{unitID | unitName}}</a>
            </div>
            <div class="ui bottom attached info message" *ngIf="_unit.parentUnit">
                <p>點選以解除母單位</p>
            </div>
            <div class="ui bottom attached info message" *ngIf="!_unit.parentUnit">
                <p>點選以指定為母單位</p>
            </div>
            </div>
        </div>
        <div class="column">
            <div class="ui segments">
            <h2 class="ui top attached header">子單位</h2>
            <div class="ui attached segment">
                <p *ngIf="_unit.childUnits.length == 0">沒有子單位</p>
                <p *ngFor="let childUnit of _unit.childUnits">
                {{childUnit | unitName:'silent'}}
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>

  `
    }), 
    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, unit_service_1.UnitService])
], UnitDetailComponent);
exports.UnitDetailComponent = UnitDetailComponent;
//# sourceMappingURL=unit-detail.component.js.map