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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var record_service_1 = require('./../services/record.service');
var RecordsListComponent = (function () {
    function RecordsListComponent(recordService, router, route) {
        this.recordService = recordService;
        this.router = router;
        this.route = route;
        this.sort = 'descending';
        this.sortKeyPath = 'filled';
    }
    RecordsListComponent.prototype.signed = function (signatures) {
        return signatures.filter(function (sig) { return sig.signed; }).length;
    };
    RecordsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoadingRecords = true;
        this.records = [];
        this.recordService.records().then(function (records) {
            _this.isLoadingRecords = false;
            _this.records = records.map(function (record) {
                return {
                    id: record.id,
                    identifier: record.owningUnit.identifier + "-" + (record.created.getUTCFullYear() - 1911) + "-" + record.serial,
                    formDisplayName: record.form.name + " " + record.revision.version.toFixed(1),
                    filled: record.created,
                    form: {
                        id: record.form.id,
                        name: record.form.name
                    },
                    revision: {
                        id: record.revision.id,
                        version: record.revision.version
                    },
                    owner: {
                        id: record.owner.id,
                        name: record.owner.name
                    },
                    owningUnit: {
                        id: record.owningUnit.id,
                        name: record.owningUnit.name
                    },
                    signatures: {
                        unsigned: record.signatures.filter(function (sig) { return !sig.signed; }).length,
                        signed: record.signatures.filter(function (sig) { return sig.signed; }).length,
                        signatures: record.signatures
                    }
                };
            });
        }).catch(function (err) {
            console.error('無法取得紀錄');
            console.error(err);
        });
    };
    RecordsListComponent.prototype.sortBy = function (keyPath) {
        if (this.sortKeyPath == keyPath) {
            this.sort = this.sort == 'ascending' ? 'descending' : 'ascending';
            this.records.reverse();
        }
        else {
            this.sort = 'descending';
            this.sortKeyPath = keyPath;
            // Sort By The Specific Key Path Descendingly
            switch (this.sortKeyPath) {
                case 'identifier':
                    this.records.sort(function (lhs, rhs) {
                        if (lhs.identifier > rhs.identifier)
                            return -1;
                        else
                            return 1;
                    });
                    break;
                case 'form.name':
                    this.records.sort(function (lhs, rhs) {
                        if (lhs.form.name == rhs.form.name)
                            return 0;
                        if (lhs.form.name > rhs.form.name)
                            return -1;
                        else
                            return 1;
                    });
                    break;
                case 'filled':
                    this.records.sort(function (lhs, rhs) {
                        if (lhs.filled == rhs.filled)
                            return 0;
                        if (lhs.filled > rhs.filled)
                            return -1;
                        else
                            return 1;
                    });
                    break;
                case 'owner.name':
                    this.records.sort(function (lhs, rhs) {
                        if (lhs.owner.name == rhs.owner.name)
                            return 0;
                        if (lhs.owner.name > rhs.owner.name)
                            return -1;
                        else
                            return 1;
                    });
                    break;
                case 'signatures.signed':
                    this.records.sort(function (lhs, rhs) {
                        if (lhs.signatures.signed == rhs.signatures.signed)
                            return 0;
                        if (lhs.signatures.signed > rhs.signatures.signed)
                            return -1;
                        else
                            return 1;
                    });
                    break;
            }
        }
    };
    RecordsListComponent.prototype.styleClasses = function (keyPath) {
        if (keyPath == this.sortKeyPath) {
            var classes = {};
            classes['sorted'] = true;
            classes[this.sort] = true;
            return classes;
        }
        else {
            return {};
        }
    };
    RecordsListComponent.prototype.view = function (record) {
        this.router.navigate([record.id], { relativeTo: this.route });
    };
    RecordsListComponent = __decorate([
        core_1.Component({
            template: "\n  <h2 class=\"ui header\">\u7D00\u9304</h2>\n  <div class=\"ui basic segment\" style=\"padding: 0;\" [class.loading]=\"isLoadingRecords\">\n    <table class=\"ui sortable selectable striped table\">\n      <thead>\n        <tr>\n          <th (click)=\"sortBy('identifier')\" [ngClass]=\"styleClasses('identifier')\" #identifier>\u6D41\u6C34\u865F</th>\n          <th (click)=\"sortBy('form.name')\" [ngClass]=\"styleClasses('form.name')\" #form>\u8868\u55AE</th>\n          <th (click)=\"sortBy('filled')\" [ngClass]=\"styleClasses('filled')\" [class]=\"\" #date>\u586B\u8868\u65E5\u671F</th>\n          <th (click)=\"sortBy('owner.name')\" [ngClass]=\"styleClasses('owner.name')\" #filler>\u586B\u8868\u4EBA</th>\n          <th (click)=\"sortBy('signatures.signed')\" [ngClass]=\"styleClasses('signatures.signed')\" #status>\u7C3D\u6838\u72C0\u6CC1</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let record of records\" (click)=\"view(record)\">\n          <td>{{record.identifier}}</td>\n          <td>{{record.formDisplayName}}</td>\n          <td>{{record.filled | date}}</td>\n          <td>{{record.owner.name}}</td>\n          <td>{{record.signatures.signed}}/{{record.signatures.signed + record.signatures.unsigned}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [record_service_1.RecordService, router_1.Router, router_1.ActivatedRoute])
    ], RecordsListComponent);
    return RecordsListComponent;
}());
exports.RecordsListComponent = RecordsListComponent;
//# sourceMappingURL=records-list.component.js.map