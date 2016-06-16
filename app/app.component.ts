import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {NavigationComponent} from './isms-nav/navigation.component'
import {AdminIndexComponent} from './admin/isms-admin-index/admin-index.component'
import {NewsComponent}       from './isms-news/news.component'
import {FormIndexComponent}  from './isms-form/form-index.component'

import {FieldsFormComponent} from './admin/form-admin/form-detail/fields-form/fields-form.component'
import {FieldsFormValueAccessor} from './admin/form-admin/form-detail/fields-form/fields-form-value-accessor.directive'

@Component({
    selector: 'isms-app',
    template:`
    <isms-nav></isms-nav>
    <br>
    <router-outlet></router-outlet>
    `,
    directives: [NavigationComponent, ROUTER_DIRECTIVES]
})

@Routes([
  {
    path:'/news',
    component: NewsComponent,
  },
  {
    path:'/form',
    component: FormIndexComponent
  }, 
  {
    path: '/admin',
    component: AdminIndexComponent
  }
])

export class AppComponent implements OnInit {
    ngOnInit() {
      if (this.location.path() == "") {
        this.router.navigate(['/news'])
      }
    }
     
    constructor(private router: Router, private location: Location) {}
}
