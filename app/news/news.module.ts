import { NgModule } from '@angular/core';
import { NewsComponent } from './news.component'

import { pipesModule } from './../pipes/pipes.module'

import { CommonModule }  from '@angular/common'
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

let routes: Routes = [
  {
    path: 'news',
    component: NewsComponent
  }
];

const newsRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes)

@NgModule({
  declarations: [
     NewsComponent
  ],
  imports: [
    CommonModule,
    pipesModule,
    newsRoutingModule
  ]
})

export class newsModule { }
