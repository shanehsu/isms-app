import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component'
import { CommonModule }  from '@angular/common'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})

export class navigationModule { }
