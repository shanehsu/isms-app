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
let FormDetailComponent = class FormDetailComponent {
    constructor(formService, route, router) {
        this.formService = formService;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        this.form = {};
        this._revisions = [];
        this.requestingNewRevision = false;
        this.isUpdating = false;
        this.isLoadingForm = true;
        this._isLoadingRevisions = true;
        // 取得表單 ID
        this._id = this.route.snapshot.params['id'];
        // 載入表單
        this.formService.form(this._id).then(form => {
            this.isLoadingForm = false;
            this.form = form;
            // 載入版本
            if (this._revisions.length == 0) {
                this._isLoadingRevisions = false;
            }
            this._revisions = this.form.revisions.map(_ => undefined);
            this.form.revisions.forEach((id, index) => {
                this.formService.revision(this._id, id).then(revision => {
                    this._revisions[index] = revision;
                    if (index == this._revisions.length - 1) {
                        this.selectRevision(this._revisions[index]);
                    }
                    if (this._revisions.indexOf(undefined) < 0) {
                        this._isLoadingRevisions = false;
                    }
                }).catch(err => {
                    console.error('無法載入表單版本');
                    console.error(err);
                });
            });
        }).catch(err => {
            console.error('無法載入表單');
            console.error(err);
        });
    }
    ngAfterViewInit() {
        $('#update_button').popup({
            inline: true
        });
    }
    submit() {
        this.isUpdating = true;
        this.formService.update(this.form)
            .then(() => { this.isUpdating = false; })
            .catch(console.error);
    }
    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
    // 表單版本操作
    isActiveRevision(revision) {
        return revision == this._selectedRevision;
    }
    // 選擇成為目前表單版本
    selectRevision(revision) {
        this._selectedRevision = revision;
    }
    newRevision() {
        this.requestingNewRevision = true;
        this.formService.newRevision(this._id).then(id => {
            this.formService.revision(this._id, id).then(revision => {
                this.requestingNewRevision = false;
                this._revisions.push(revision);
                this.selectRevision(revision);
            }).catch(err => {
                console.error('無法取得剛剛新增的版本');
                console.error(err);
            });
        }).catch(err => {
            console.error('無法新增版本');
            console.error(err);
        });
    }
    publishRevision(donePublishing) {
        let revisionToPublish = this._selectedRevision;
        this.formService.publishRevision(this._id, revisionToPublish).then(() => {
            revisionToPublish.published = true;
            donePublishing();
        }).catch(err => {
            console.error('發佈失敗');
            console.error(err);
        });
    }
    updateRevision(doneUpdating) {
        let revisionToUpdate = this._selectedRevision;
        this.formService.updateRevision(this._id, revisionToUpdate).then(() => {
            doneUpdating();
        }).catch(err => {
            console.error('更新失敗');
            console.error(err);
        });
    }
    deleteRevision() {
        let revisionToDelete = this._selectedRevision;
        this.formService.deleteRevision(this._id, revisionToDelete._id).then(() => {
            let filteredRevision = this._revisions.filter(revision => revision != revisionToDelete);
            let lastRevision = filteredRevision[filteredRevision.length - 1];
            this.selectRevision(lastRevision);
            this._revisions.splice(this._revisions.indexOf(revisionToDelete), 1);
        }).catch(err => {
            console.error('無法刪除版本');
            console.error(err);
        });
    }
};
FormDetailComponent = __decorate([
    core_1.Component({
        selector: 'form-detail',
        template: `
  <form *ngIf="form" class="ui padded raised form segment" (ngSubmit)="submit()" #formForm="ngForm" [class.loading]="isLoadingForm">
    <h2 class="ui header">基本資訊</h2>
    <div class="field">
      <label>ID</label>
      <p>{{form._id}}</p>
    </div>
    <div class="field">
      <label>表單 ID</label>
      <input type="text" [(ngModel)]="form.identifier" name="identifier" required>
    </div>
    <div class="field">
      <label>名稱</label>
      <input type="text" [(ngModel)]="form.name" name="name" required>
    </div>

    <div style="text-align: right;">
      <button type="button" class="ui basic button" (click)="cancel()">返回</button>
      <button type="submit" id="update_button" class="ui basic button" [class.green]="formForm.form.valid" [class.red]="!formForm.form.valid"
        [disabled]="!formForm.form.valid" data-content="該按鈕只能更新表單 ID 以及表單名稱。" [class.loading]="isUpdating">更新</button>
    </div>
  </form>

  <div *ngIf="_revisions" class="ui raised padded segment" [class.loading]="_isLoadingRevisions">
    <h2 class="ui header">版本</h2>
    <div class="ui top attached tabular menu">
      <a *ngFor="let revision of _revisions" class="link item" [class.active]="isActiveRevision(revision)" (click)="selectRevision(revision)">
        <i *ngIf="!revision" class="notched circle loading icon"></i>
        <span>{{revision?.revision?.toFixed(1)}}</span>
      </a>
      <a class="link item" (click)="newRevision()">
        <i *ngIf="requestingNewRevision" class="notched circle loading icon"></i>
        <i *ngIf="!requestingNewRevision" class="plus icon"></i>
      </a>
    </div>
    <div class="ui bottom attached segment">
      <p *ngIf="_revisions.length == 0">沒有版本</p>
      <revision *ngIf="_revisions.length != 0" [form-id]="form._id" [(ngModel)]="_selectedRevision" (publish)="publishRevision($event)" (update)="updateRevision($event)" (delete)="deleteRevision()"></revision>
    </div>
  </div>`
    }), 
    __metadata('design:paramtypes', [form_service_1.FormService, router_1.ActivatedRoute, router_1.Router])
], FormDetailComponent);
exports.FormDetailComponent = FormDetailComponent;
//# sourceMappingURL=form-detail.component.js.map