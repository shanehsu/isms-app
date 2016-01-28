import {Component, OnInit, Inject} from 'angular2/core';
import {Router, Location}          from 'angular2/router';

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
  private privilege: number;
  
  ngOnInit() {
    this.privilege = 4;
    this.navigationItems = this._config.navigationItems;
  }
  
  navigate(item: NavigationItem) {
    this._router.navigate([item.component]);
  }
  
  isActive(item: NavigationItem) {
    return this._location.path().startsWith(item.route);
  }
  
  renewPrivilege() {
    if (!this._authService.has_token()) {
      this.privilege = 4;
    } else {
      this._authService.me().then(user => {
        this.privilege = user.group;
      });
    }
  }
  
  constructor(private _router: Router, private _location: Location, private _authService: AuthService, @Inject('app.config') private _config: Config) {}
}
