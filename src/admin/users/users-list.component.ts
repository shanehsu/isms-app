import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Group } from './../../types/group'
import { Unit } from './../../types/unit'
import { UserService } from './../../services/user.service'
import { UnitService } from './../../services/unit.service'
import { MessageService } from './../../services/message.service'
import { User } from './../../types/user'
import { WizardComponent } from './../../views/wizard/wizard.component'

import { SemanticModalComponent } from "ng-semantic"

enum UserState {
  Normal = 1,
  Deleting = 2,
  Errored = 3
}

@Component({
  template: `
    <div class="ui one column grid">
      <form class="ui form right aligned column">
        <button type="button" class="ui right floated teal labeled icon button" (click)="showWizard()">
          <i class="plus icon"></i>新增使用者精靈
        </button>
      </form>
    </div>
    <table class="ui striped table">
      <thead>
        <tr>
          <th style="min-width: 6em;">姓名</th>
          <th style="width: 100%;">電子郵件</th>
          <th style="min-width: 10em;">權限</th>
          <th style="min-width: 12em;">動作</th>
        </tr>
      </thead>
      <tbody>
        <!-- 訊息 -->
        <tr style="height: 8em;" *ngIf="!loading && users && users.length == 0 && !loadingError">
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
        <tr *ngFor="let user of users" [class.warning]="states[user.id] == 2" [class.error]="states[user.id] == 3">
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.group | groupName}}</td>
          <td style="text-align: center;">
            <div class="small ui buttons">
              <button type="button" class="ui basic teal button" (click)="edit(user.id)">編輯</button>
              <button type="button" class="ui basic red button" (click)="delete(user.id)" [class.loading]="states[user.id] == 2">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <sm-modal title="建立使用者精靈" class="basic" #newuser_wizard>
      <modal-content>
        <wizard #newuser_wizard_comp>
          <step name="基本資料" [canNext]="basicInfoForm.valid">
            <form class="ui form" #basicInfoForm="ngForm">
              <div class="ui field">
                <label>姓名</label>
                <input type="text" [(ngModel)]="wizardData.name" name="name" required>
              </div>
              <div class="ui field">
                <label>電子郵件</label>
                <input type="email" [(ngModel)]="wizardData.email" name="email" required>
              </div>
            </form>
          </step>
          <step name="權限" [canNext]="wizardData.group" canPrevious="true">
            <form class="ui form">
              <div class="field">
                <label>權限</label>
                <div class="grouped fields" id="groupRadio">
                  <div class="field">
                    <div class="ui radio checkbox">
                      <input name="groupRadio" type="radio" [checked]="wizardData.group == 'securityPersonnel'" (change)="wizardData.group = 'securityPersonnel'">
                      <label>資訊安全人員</label>
                    </div>
                  </div>
                  <div class="field">
                    <div class="ui radio checkbox">
                      <input name="groupRadio" type="radio" [checked]="wizardData.group == 'users'" (change)="wizardData.group = 'users'">
                      <label>一般使用者</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </step>
          <step name="單位及角色" (active)="loadWizardUnits()" [canNext]="wizardData.selectedUnit && wizardData.roles.length > 0" canPrevious="true">
            <form class="ui form" [class.loading]="wizardData.units === null">
              <div class="ui field">
                <label>單位</label>
                <select (change)="wizardSelectUnit($event.srcElement)">
                  <option *ngFor="let unit of wizardData.units">{{unit.name}}</option>
                </select>
              </div>
              <div class="ui field">
                <label>角色</label>
                <div class="grouped fields" id="roleCheckbox">
                  <div class="field">
                    <div class="ui checkbox">
                      <input name="roleCheckbox" type="checkbox" 
                        [disabled]="!wizardData.selectedUnit || (wizardData.selectedUnit.members.manager !== undefined && wizardData.selectedUnit.members.manager !== null)"
                        [checked]="wizardData.roles.includes('manager')" (change)="wizardRole('manager', $event.srcElement)">
                      <label>主管</label>
                    </div>
                  </div>
                  <div class="field">
                    <div class="ui checkbox">
                      <input name="roleCheckbox" type="checkbox"
                        [disabled]="!wizardData.selectedUnit || (wizardData.selectedUnit.members.docsControl !== undefined && wizardData.selectedUnit.members.docsControl !== null)"
                        [checked]="wizardData.roles.includes('docsControl')" (change)="wizardRole('docsControl', $event.srcElement)">
                      <label>文件管理</label>
                    </div>
                  </div>
                  <div class="field">
                    <div class="ui checkbox">
                      <input name="roleCheckbox" type="checkbox" [disabled]="!wizardData.selectedUnit"
                        [checked]="wizardData.roles.includes('agent')"  (change)="wizardRole('agent', $event.srcElement)">
                      <label>承辦人</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </step>
          <step name="確認" (active)="makeRoleString()" canPrevious="true" canNext="true">
            <p>請問下列資訊是否正確？</p>
            <p>名字：{{wizardData.name}}</p>
            <p>SSO 電子郵件：{{wizardData.email}}</p>
            <p>權限：{{wizardData.group == "securityPersonnel" ? "資訊安全人員" : "一般使用者"}}</p>
            <p>所屬單位：{{ wizardData.selectedUnit ? wizardData.selectedUnit.name : ""}}</p>
            <p>角色：{{wizardData.rolesString}}</p>
          </step>
          <step name="正在處理" (active)="wizardCreateUser()" canPrevious="false" [canNext]="wizardData.canFinish">
            <div class="ui list">
              <div class="item" *ngFor="let task of wizardData.wizardTasks">
                <i [ngClass]="iconClass[task.state]"></i>
                <p class="content">{{task.name}}</p>
              </div>
            </div>
          </step>
          <done>
            <p>你已經完成精靈！</p>
          </done>
        </wizard>
      </modal-content>
    </sm-modal>
    `,
  styles: [`
    wizard p, wizard pre {
      color: black;
    }
  `]
})

export class UsersListComponent implements OnInit {
  private loading: boolean
  private loadingError: any
  private shouldResetOnNextLoad: boolean = true

  // 新增狀態
  private creating: boolean

  // 新聞狀態（正常、刪除中、錯誤）
  private states: { [id: string]: UserState }

  private users: User[]

  ngOnInit() {
    this.users = []

    this.loading = true
    this.loadingError = null
    this.creating = false
    this.states = {}

    this.reload()
  }
  private async reload() {
    try {
      let users = await this.userService.get()
      for (let user of users as User[]) {
        this.states[user.id] = UserState.Normal
      }
      this.users = users as User[]
      this.loading = false
    } catch (err) {
      this.loadingError = err
      this.loading = false
    }
  }
  private async create() {
    this.creating = true
    try {
      let id = await this.userService.create()
      this.creating = false
      this.edit(id)
    } catch (err) {
      this.messageService.error("無法建立使用者", "建立使用者時發生錯誤，請檢查是否有使用者的 email 未修改。")
    }
  }
  private edit(id: string): void {
    this.router.navigate([id], { relativeTo: this.route })
  }
  private async delete(id: string) {
    if (!confirm('確定刪除該名使用者?')) {
      return
    }

    this.states[id] = UserState.Deleting
    try {
      await this.userService.delete(id)
      delete this.states[id]
      this.users.splice(this.users.findIndex(x => x.id == id), 1)
    } catch (err) {
      this.states[id] = UserState.Errored
      this.messageService.error('刪除失敗', '刪除失敗，資料與伺服器可能不同步，請考慮重整網頁。')
    }
  }
  private showWizard() {
    if (this.shouldResetOnNextLoad) {
      this.wizardData = {
        email: "@cc.ncue.edu.tw",
        name: "",
        group: null,
        roles: [],
        rolesString: "",
        units: null,
        selectedUnit: null,
        canFinish: true,
        wizardTasks: []
      }
      this.wizardComponent.reset()
    }
    this.newUserWizardModal.show({
      onHide: this.wizardCanHide.bind(this),
      closable: false,
      detachable: false
    })
  }

  // 精靈
  private iconClass = {
    Done: ['green', 'checkmark', 'icon'],
    Pending: ['yellow', 'hourglass', 'start', 'icon'],
    Loading: ['teal', 'notched', 'circle', 'loading', 'icon'],
    Error: ['red', 'warning', 'icon']
  }
  @ViewChild('newuser_wizard') newUserWizardModal: SemanticModalComponent
  @ViewChild('newuser_wizard_comp') wizardComponent: WizardComponent
  /**
   * 精靈的資料
   */
  private wizardData: {
    /**
     * 該使用者的電子郵件
     */
    email: string,
    /**
     * 該使用者的名字
     */
    name: string,
    /**
     * 該使用者的群組
     */
    group: Group,
    /**
     * 該使用者要擔任的職位
     */
    roles: ("manager" | "docsControl" | "agent")[],
    /**
     * 顯示在總覽畫面中的職位字串
     */
    rolesString: string,
    /**
     * 提供選項的所有單位
     */
    units: Unit[],
    /**
     * 使用者所選擇的單位
     */
    selectedUnit: Unit,
    /**
     * 決定是否可以進入完成畫面
     */
    canFinish: boolean,
    wizardTasks: { name: string, state: 'Pending' | 'Loading' | 'Done' | 'Error' }[]
  } = {
    email: "",
    name: "",
    group: null,
    roles: [],
    rolesString: "",
    units: null,
    selectedUnit: null,
    canFinish: true,
    wizardTasks: []
  }

  private async loadWizardUnits() {
    if (!this.wizardData.units) {
      this.wizardData.units = await this.unitService.units()
      this.wizardData.selectedUnit = this.wizardData.units[0]
    }
  }
  private async wizardCreateUser() {
    this.wizardData.canFinish = false

    this.wizardData.wizardTasks = [
      { name: '建立使用者', state: 'Pending' },
      { name: '更新使用者資料', state: 'Pending' },
      { name: '更新單位資料', state: 'Pending' }
    ]

    // 建立使用者
    this.wizardData.wizardTasks[0].state = 'Loading'
    let userId: string = ''
    try {
      userId = await this.userService.create()
    } catch (e) {
      this.wizardData.wizardTasks[0].state = 'Error'
      return
    }
    this.wizardData.wizardTasks[0].state = 'Done'

    // 更新使用者資料
    this.wizardData.wizardTasks[1].state = 'Loading'
    let user: User = null
    try {
      user = (await this.userService.get(userId)) as User
      user.name = this.wizardData.name
      user.email = this.wizardData.email
      user.group = this.wizardData.group

      let update = await this.userService.update(user)
    } catch (e) {
      this.wizardData.wizardTasks[1].state = 'Error'
      return
    }
    this.wizardData.wizardTasks[1].state = 'Done'

    // 更新單位資料
    this.wizardData.wizardTasks[2].state = 'Loading'
    try {
      let unit = this.wizardData.selectedUnit
      if (this.wizardData.roles.includes('manager') && !unit.members.manager) {
        unit.members.manager = userId
      }
      if (this.wizardData.roles.includes('docsControl') && !unit.members.docsControl) {
        unit.members.docsControl = userId
      }
      if (this.wizardData.roles.includes('agent')) {
        unit.members.agents.push(userId)
      }

      let task = await this.unitService.update(unit)
    } catch (e) {
      this.wizardData.wizardTasks[2].state = 'Error'
      return
    }
    this.wizardData.wizardTasks[2].state = 'Done'

    this.wizardData.canFinish = true

    this.users.push(user)
  }

  private wizardCanHide(): boolean { return this.wizardData.canFinish }
  private wizardRole(role: 'agent' | 'manager' | 'docsControl', sourceElement: HTMLInputElement) {
    if (sourceElement.checked) {
      this.wizardData.roles.push(role)
    } else {
      this.wizardData.roles.splice(this.wizardData.roles.indexOf(role), 1)
    }
  }
  private wizardSelectUnit(sourceElement: HTMLSelectElement) {
    this.wizardData.selectedUnit = this.wizardData.units[sourceElement.selectedIndex]
    this.wizardData.roles = []
  }
  private makeRoleString() {
    this.wizardData.rolesString = this.wizardData.roles.map($ => $ == "manager" ? "主管" : $ == "docsControl" ? "文件管理" : "承辦人").join("、")
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private unitService: UnitService,
    private messageService: MessageService) { }
}
