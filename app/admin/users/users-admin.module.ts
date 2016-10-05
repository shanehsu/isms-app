import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { pipesModule } from './../../pipes/pipes.module'

import { UsersListComponent } from './users-list.component'
import { UserDetailComponent } from './user-detail.component'
export { UsersListComponent, UserDetailComponent }

@Component({
  template: `<router-outlet></router-outlet>`
})
export class UserAdminComponent { }

@NgModule({
  declarations: [
    UserAdminComponent,
    UsersListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    pipesModule
  ],
  exports: [
    UserAdminComponent,
    UsersListComponent,
    UserDetailComponent
  ]
})

export class usersAdminModule { }
