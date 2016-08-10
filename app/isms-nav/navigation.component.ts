import {Component, OnInit, Inject} from '@angular/core';
import {Router}          from '@angular/router';
import {Location} from '@angular/common'

import {Config}                    from './../types/config'
import {NavigationItem}            from './../types/navigation-item'

import {AuthService}               from './../services/auth.service'

import {NavigationLoginComponent}  from './isms-nav-login/navigation-login.component'

@Component({
    selector: 'isms-nav',
    templateUrl: '/app/isms-nav/navigation.template.html',
    directives: [NavigationLoginComponent]
})

export class NavigationComponent implements OnInit {
  private navigationItems: [NavigationItem];
  private userGroup: number;
  
  ngOnInit() {
    console.dir(this.router.routeTree)
    this.userGroup = 4;
    this.navigationItems = this._config.navigationItems;
  }
  
  navigate(item: NavigationItem) {
    console.log(item.path)
    this.router.navigate([item.path]);
  }
  
  isActive(item: NavigationItem) {
    return this._location.path().startsWith(item.path);
  }
  
  renewPrivilege() {
    if (!this._authService.has_token()) {
      this.userGroup = 4;
    } else {
      this._authService.me().then(user => {
        this.userGroup = user.group;
      });
    }
  }
  
  constructor(private router: Router, private _location: Location, private _authService: AuthService, @Inject('app.config') private _config: Config) {}
}
