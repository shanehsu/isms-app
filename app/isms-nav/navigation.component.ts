import {Component, OnInit, Inject} from 'angular2/core';
import {Router}                    from 'angular2/router';
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
    
    constructor(private _router: Router, @Inject('app.config') private _config) {}
}
