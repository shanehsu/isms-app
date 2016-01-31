import {Component, OnInit, Inject, Input} from 'angular2/core';
import {Router, Location, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavigationItem} from './../../types/navigation-item'
import {Config}         from './../../types/config'

import {AuthService} from './../../services/auth.service'

import {NewsAdminComponent} from './../news-admin/news-admin.component'
import {UserAdminComponent} from './../user-admin/user-admin.component'
import {UnitAdminComponent} from './../unit-admin/unit-admin.component'

@Component({
    selector: 'isms-admin-index',
    templateUrl: '/app/admin/isms-admin-index/admin-index.template.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/news/...',
    name: 'NewsAdmin',
    component: NewsAdminComponent,
    useAsDefault: true
  },
  {
    path: '/user/...',
    name: 'UserAdmin',
    component: UserAdminComponent
  },
  {
    path: '/unit/...',
    name: 'UnitAdmin',
    component: UnitAdminComponent
  }
])

export class AdminIndexComponent implements OnInit {
  private adminItems: [NavigationItem];
  private privilege: number;
  
  ngOnInit() {
    this.privilege = 4;
    this.adminItems =  this._config.adminItems;
    
    this._authService.privilege().then(p => this.privilege = p);
  }
  
  isActive(item): boolean {
    return this._location.path().startsWith('/admin' + item.route);
  }
  
  navigate(item) {
    this._router.navigate([item.component]);
  }
  
  constructor(private _router: Router, private _authService: AuthService, private _location: Location, @Inject('app.config') private _config: Config) {}
}
