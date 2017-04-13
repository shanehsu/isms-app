import { Component, OnInit, Inject, Input } from '@angular/core';
import { Location } from '@angular/common'

import { NavigationItem } from './../types/navigation-item'
import { Group } from './../types/group'
import { Config } from './../types/config'

import { MeService } from './../services/me.service'

@Component({
  template: `
  <h2 class="ui header">管理區</h2>
  <div class="ui grid">
    <div class="sixteen wide mobile two wide computer column">
      <div class="ui secondary stacking fluid vertical pointing menu">
        <ng-template ngFor let-item [ngForOf]="adminItems">
          <a class="item" [routerLink]="item.path" routerLinkActive="active">
            {{item.name}}
          </a>
        </ng-template>
      </div>
    </div>
    <div id="content" class="sixteen wide mobile fourteen wide computer column">
      <router-outlet></router-outlet>
    </div>
  </div>`
})

export class AdminComponent implements OnInit {
  private adminItems: NavigationItem[];

  ngOnInit() {
    this.adminItems = []
    this.meService.user.subscribe(user => {
      if (user) {
        this.adminItems = this.config.adminItems.filter(i => i.group.includes(user.group))
      } else {
        this.adminItems = this.config.adminItems.filter(i => i.group.includes('guests' as Group))
      }
    })
  }

  constructor(private meService: MeService, @Inject('app.config') private config: Config) { }
}