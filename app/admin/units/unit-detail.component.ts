// Angular 2
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

// Services
import { UnitService } from './../../services/unit.service'
import { UserService } from './../../services/user.service'
import { DragulaService } from 'ng2-dragula'

// Interfaces
import { Unit, User } from './../../types/types'

@Component({
  template: `
  <div class="ui one column grid">
    <div class="column">
      <div class="ui padded dimmable raised segment" [class.loading]="loadingUnits" [class.dimmed]="unitsLoadingError">
        <h2 class="ui header">基本資訊</h2>
        <div class="ui simple blurring dimmer">
          <div class="content">
            <div class="center">
              <a class="link" (click)="reloadUnits()" style="font-size: 1.5em; color: #7e8bb3;">重新載入？</a>
            </div>
          </div>
        </div>
        <form class="ui form" #unitForm="ngForm">
          <div class="field">
            <label>ID</label>
            <p>{{unit.id}}</p>
          </div>
          <div class="field">
            <label>單位名稱</label>
            <input type="text" [(ngModel)]="unit.name" name="name" required>
          </div>
          <div class="field">
            <label>單位代碼</label>
            <!-- a) 改成字串 -->
            <input type="number" min="1000" max="9999" [(ngModel)]="unit.identifier" name="title" required>
          </div>
        </form>
      </div>
    </div>
    <div class="column">
      <div class="ui padded dimmable raised segment" [class.loading]="loadingUnits" [class.dimmed]="unitsLoadingError">
        <h2 class="ui header">母單位</h2>
        <div class="ui simple blurring dimmer">
          <div class="content">
            <div class="center">
              <a class="link" (click)="reloadUnits()" style="font-size: 1.5em; color: #7e8bb3;">重新載入？</a>
            </div>
          </div>
        </div>
        <div class="ui label" [class.green]="unit.parentUnit == '' || !unit.parentUnit" (click)="unit.parentUnit = ''">沒有母單位</div>
        <div class="ui label" *ngFor="let unitId of acceptedParents" [class.green]="unit.parentUnit == unitId" (click)="unit.parentUnit = unitId">{{unitMap[unitId].name}}</div>
      </div>
    </div>
    <div class="ui column basic raised segment" style="padding-top: 1em; margin-top: 0;" [class.loading]="loadingUsers" [class.dimmed]="usersLoadingError">
      <div class="ui dimmable two column grid stretched row">
        <div class="column">
          <div class="ui segments">
            <h2 class="ui top attached header">非單位內人員</h2>
            <div class="ui attached segment dragula-container" style="border-bottom: none; border-radius: 0; min-height: 30em;" [dragula]="'users'" [dragulaModel]="notDelegated" [attr.data-container]="'not-delegated'">
              <div class="ui label" *ngFor="let user of notDelegated" [attr.data-id]="users[user].id">{{users[user].name}}</div>
            </div>
          </div>
        </div>
        <div class="column">
        <!-- 兩個職位 -->
          <div class="ui segments">
            <h2 class="ui top attached header">承辦人</h2>
            <div class="ui attached segment dragula-container" *ngIf="!loadingUsers" [dragula]="'users'" [dragulaModel]="unit.members.agents" [attr.data-container]="'agents'">
              <div class="ui label" *ngFor="let user of unit.members.agents" [attr.data-id]="users[user].id">{{users[user].name}}</div>
            </div>
            <h2 class="ui attached header">廠商</h2>
            <div class="ui attached segment dragula-container" *ngIf="!loadingUsers" [dragula]="'users'" [dragulaModel]="unit.members.vendors" [attr.data-container]="'vendors'">
              <div class="ui label" *ngFor="let user of unit.members.vendors" [attr.data-id]="users[user].id">{{users[user].name}}</div>
            </div>
            <h2 class="ui attached header">組長</h2>
            <div class="ui attached segment dragula-container" *ngIf="!loadingUsers" [dragula]="'users'" [dragulaModel]="manager" [attr.data-container]="'manager'">
              <div class="ui label" *ngFor="let user of manager" [attr.data-id]="users[user].id">{{users[user].name}}</div>
            </div>
            <h2 class="ui attached header">文管</h2>
            <div class="ui attached segment dragula-container" *ngIf="!loadingUsers" [dragula]="'users'" [dragulaModel]="docsControl" [attr.data-container]="'docsControl'">
              <div class="ui label" *ngFor="let user of docsControl" [attr.data-id]="users[user].id">{{users[user].name}}</div>
            </div>
          </div>
        </div>
        <div class="ui simple blurring dimmer">
          <div class="content">
            <div class="center">
              <a class="link" (click)="reloadUsers()" style="font-size: 1.5em; color: #7e8bb3;">重新載入？</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui basic segment column" style="text-align: right; padding-top: 1em; margin-top: 0;">
      <button type="button" class="ui basic button" (click)="return()">取消</button>
      <button type="button" id="update_button" class="ui basic button" [class.green]="unitForm.form.valid" [class.red]="!unitForm.form.valid"
      [disabled]="!unitForm.form.valid" data-content="該按鈕只能更新單位名稱以及單位編號。" [class.loading]="updating" (click)="update()">更新</button>
    </div>
  </div>
  `,
  styles: [
    `.dragula-container { min-height: 5em; }`
  ]
})

export class UnitDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private loadingUnits: boolean
  private unitsLoadingError: any
  private loadingUsers: boolean
  private usersLoadingError: any
  private units: Unit[]
  private unitMap: { [unitId: string]: Unit }
  private unit: Unit

  private users: { [userId: string]: User }
  private notDelegated: string[]

  // 假的 Buckets 負責處理 docsControl, manager
  private docsControl: string[]
  private manager: string[]

  private acceptedParents: string[]
  private updating: boolean

  constructor(private router: Router, private route: ActivatedRoute, private unitService: UnitService,
    private userService: UserService, private dragulaService: DragulaService) { }
  ngOnDestroy(): void {
    this.dragulaService.destroy('users')
  }
  ngOnInit(): void {
    this.unitsLoadingError = null
    this.usersLoadingError = null
    this.loadingUsers = false
    this.loadingUnits = false

    this.users = {}
    this.unitMap = {}
    this.acceptedParents = []
    this.notDelegated = []
    this.docsControl = []
    this.manager = []
    this.updating = false

    this.unit = this.unitService.placeholder
    this.reloadUnits()

    this.dragulaService.setOptions('users', {
      "accepts": (el: HTMLDivElement, dst: HTMLDivElement, src: HTMLDivElement, sib) => {
        let id = el.dataset['id']
        let source = src.dataset['container']
        let destination = dst.dataset['container']

        // 規則：
        // 廠商只能進入廠商
        // manager、docsControl 只能有一個人
        let user = this.users[id]
        if (user.group == 'vendors') {
          // 廠商
          if (destination == 'vendors' || destination == 'not-delegated') {
            return true
          } else {
            return false
          }
        } else {
          // 校內人士
          if (destination == 'manager') {
            if (this.manager.length == 0) {
              return true
            } else {
              return false
            }
          } else if (destination == 'docsControl') {
            if (this.docsControl.length == 0) {
              return true
            } else {
              return false
            }
          } else if (destination == 'vendors') {
            console.log('verdict is false.')
            return false
          } else {
            return true
          }
        }
      }
    })
    this.dragulaService.dropModel.subscribe(args => {
      let [bag, element, dst, src] = <[string, HTMLDivElement, HTMLDivElement, HTMLDivElement]>args

      let id = element.dataset['id']
      let source = src.dataset['container']
      let destination = dst.dataset['container']
      let user = this.users[id]

      if (user.group != 'vendors') {
        if (destination == 'manager') {
          this.unit.members.manager = id
        } else if (destination == 'docsControl') {
          this.unit.members.docsControl = id
        }
        if (source == 'manager') {
          delete this.unit.members.manager
        } else if (source == 'docsControl') {
          delete this.unit.members.docsControl
        }
      }
    })
  }
  async reloadUsers() {
    this.loadingUsers = true
    this.usersLoadingError = null
    this.users = {}
    this.notDelegated = []
    this.docsControl = []
    this.manager = []

    try {
      let allUsers = await this.userService.get() as User[]
      allUsers.forEach(user => this.users[user.id] = user)
      let usersInUnit = this.units.reduce((users, unit) => {
        let values = [...users,
        ...unit.members.agents,
        ...unit.members.none,
        ...unit.members.vendors]
        if (unit.members.docsControl) {
          values.push(unit.members.docsControl)
        }
        if (unit.members.manager) {
          values.push(unit.members.manager)
        }

        return values
      }, <string[]>[])

      // 分配到 notDelegated 中
      let free = allUsers.filter(user => !usersInUnit.includes(user.id))
      for (let user of free) {
        this.notDelegated.push(user.id)
      }
    } catch (err) {
      this.usersLoadingError = err
    }
    this.loadingUsers = false
  }
  async reloadUnits() {
    this.loadingUnits = true
    this.loadingUsers = true
    this.unitsLoadingError = null
    this.unitMap = {}
    this.acceptedParents = []
    let unitId = this.route.snapshot.params['id']
    try {
      this.units = await this.unitService.units()
      this.unit = this.units.find(unit => unit.id == unitId)
      // 找到自己所有的小孩
      let recursiveChildren: string[] = []
      let current = unitId
      while (current) {
        recursiveChildren.push(current)
        let parent = this.units.find(unit => unit.parentUnit == current)
        if (parent) {
          current = parent.id
        } else {
          break
        }
      }

      console.log('childs')
      console.dir(recursiveChildren)

      // 過濾
      for (let unit of this.units) {
        this.unitMap[unit.id] = unit
      }
      this.acceptedParents = this.units.filter(unit => !recursiveChildren.includes(unit.id)).map(unit => unit.id)

      this.docsControl = [this.unit.members.docsControl]
      this.manager = [this.unit.members.manager]

      this.reloadUsers()
    } catch (err) {
      this.unitsLoadingError = err
    }

    this.loadingUnits = false
  }
  ngAfterViewInit() {
    ($('#update_button') as any).popup({
      inline: true
    })
  }
  return() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
  async update() {
    this.updating = true
    try {
      await this.unitService.update(this.unit)
    } catch (err) {

    }
    this.updating = false
  }
  clearParent() {
    delete this.unit.parentUnit
  }
}