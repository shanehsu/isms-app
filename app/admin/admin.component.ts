import {Component, OnInit, Inject, Input} from '@angular/core';
import {Location} from '@angular/common'

import {NavigationItem} from './../types/navigation-item'
import {Group}         from './../types/group'
import {Config}         from './../types/config'

import {AuthService} from './../services/auth.service'

@Component({
  template: `
  <h2 class="ui header">管理區</h2>
  <div class="ui grid">
    <div class="sixteen wide mobile two wide computer column">
      <div class="ui secondary stacking fluid vertical pointing menu">
        <template ngFor let-item [ngForOf]="adminItems">
          <a class="active item" *ngIf="item.group.includes(privilege)" [routerLink]="item.path" routerLinkActive="active">
            {{item.name}}
          </a>
        </template>
      </div>
    </div>
    <div id="content" class="sixteen wide mobile fourteen wide computer column">
      <router-outlet></router-outlet>
    </div>
  </div>`
})

export class AdminComponent implements OnInit {
  private adminItems: [NavigationItem];
  private privilege: Group;
  
  ngOnInit() {
    this.privilege = "vendors";
    this.adminItems =  this.config.adminItems;
    
    this.authService.privilege().then(p => this.privilege = p);
  }

  constructor(private authService: AuthService, @Inject('app.config') private config: Config) {}
}