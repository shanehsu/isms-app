import {Component, OnInit, Inject} from 'angular2/core';
import {Router, Location} from 'angular2/router';
import {NavigationItem}            from './../types/navigation-item'

@Component({
    selector: 'isms-nav',
    templateUrl: '/app/isms-nav/navigation.template.html'
})

export class NavigationComponent implements OnInit {
  private navigationItems: [NavigationItem];
  
  ngOnInit() {
    this.navigationItems = this._config.navigationItems;
  }
  
  navigate(item: NavigationItem) {
    this._router.navigate([item.component]);
  }
  
  isActive(item: NavigationItem) {
    return this._location.path().startsWith(item.route);
  }
  
  constructor(private _router: Router, private _location: Location, @Inject('app.config') private _config) {}
}
