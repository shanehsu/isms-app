import { NgModule, Component } from '@angular/core'

import { CommonModule }  from '@angular/common'
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AdminComponent } from './admin.component'

import { newsAdminModule } from './news/news-admin.module'
import { NewsAdminComponent, NewsListComponent, NewsDetailComponent } from './news/news-admin.module'
import { usersAdminModule } from './users/users-admin.module'
import { UserAdminComponent, UsersListComponent, UserDetailComponent } from './users/users-admin.module'
import { unitsAdminModule } from './units/units-admin.module'
import { UnitAdminComponent, UnitsListComponent, UnitDetailComponent } from './units/units-admin.module'
import { formsAdminModule } from './forms/forms-admin.module'
import { FormAdminComponent, FormsListComponent, FormDetailComponent } from './forms/forms-admin.module'

let routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      { path: 'news', 
        component: NewsAdminComponent,
        children: [
          { path: '', component: NewsListComponent },
          { path: ':id', component: NewsDetailComponent }
        ]
      },
      { path: 'users',
        component: UserAdminComponent,
        children: [
          { path: '', component: UsersListComponent },
          { path: ':id', component: UserDetailComponent }
        ]
      },
      { path: 'units',
        component: UnitAdminComponent,
        children: [
          { path: '', component: UnitsListComponent },
          { path: ':id', component: UnitDetailComponent }
        ]
      },
      { path: 'forms',
        component: FormAdminComponent,
        children: [
          { path: '', component: FormsListComponent },
          { path: ':id', component: FormDetailComponent }
        ]
      }
    ]
  }
];

const adminRoutingModule: ModuleWithProviders = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    adminRoutingModule,
    newsAdminModule,
    usersAdminModule,
    unitsAdminModule,
    formsAdminModule
  ]
})

export class adminModule { }
