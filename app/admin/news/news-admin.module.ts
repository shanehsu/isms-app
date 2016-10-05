import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { pipesModule } from './../../pipes/pipes.module'
import { formControlsModule } from './../../controls/form-controls.module'
import { NewsListComponent } from './news-list.component'
import { NewsDetailComponent } from './news-detail.component'

export { NewsListComponent, NewsDetailComponent }

@Component({
  template: `<router-outlet></router-outlet>`
})
export class NewsAdminComponent { }

@NgModule({
  declarations: [
    NewsAdminComponent,
    NewsListComponent,
    NewsDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
    pipesModule,
    formControlsModule
  ],
  exports: [
    NewsAdminComponent,
    NewsListComponent,
    NewsDetailComponent
  ]
})

export class newsAdminModule { }
