import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'isms-admin-index',
    template:`
    <h2>Admin Index</h2>
    <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})

// @RouteConfig([
// ])

export class AdminIndexComponent implements OnInit {
    ngOnInit() {
        
    }
    
    constructor() {}
}
