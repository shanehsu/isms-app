import {Component, OnInit, Inject, Input} from '@angular/core';
import {Location} from '@angular/common'
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {NavigationItem} from './../../types/navigation-item'
import {Config}         from './../../types/config'

import {AuthService} from './../../services/auth.service'

import {NewsAdminComponent} from './../news-admin/news-admin.component'
import {UserAdminComponent} from './../user-admin/user-admin.component'
import {UnitAdminComponent} from './../unit-admin/unit-admin.component'
import {FormAdminComponent} from './../form-admin/form-admin.component'

@Component({
    selector: 'isms-admin-index',
    templateUrl: '/app/admin/isms-admin-index/admin-index.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
  {
    path: '/news',
    component: NewsAdminComponent,
  },
  {
    path: '/user',
    component: UserAdminComponent
  },
  {
    path: '/unit',
    component: UnitAdminComponent
  },
  {
    path: '/form',
    component: FormAdminComponent
  }
])

export class AdminIndexComponent implements OnInit {
  private adminItems: [NavigationItem];
  private privilege: number;
  
  ngOnInit() {
    this.privilege = 4;
    this.adminItems =  this._config.adminItems;
    
    this._authService.privilege().then(p => this.privilege = p);
    
    if (this.location.path() == "/admin") {
       this.router.navigate(['/admin/news'])
    }
  }
  
  isActive(item): boolean {
    return this.location.path().startsWith('/admin' + item.path)
  }
  
  navigate(item) {
    this.router.navigate(['/admin' + item.path]);
  }
  
  constructor(private router: Router, private location: Location, private _authService: AuthService, @Inject('app.config') private _config: Config) {}
}
