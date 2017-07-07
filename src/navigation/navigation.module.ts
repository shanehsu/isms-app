import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component'
import { directivesModule } from './../directives/directives.module'
import { CommonModule }  from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgSemanticModule } from "ng-semantic"

@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    directivesModule,

    CommonModule,
    RouterModule,
    FormsModule,

    NgSemanticModule
  ]
})

export class navigationModule { }
