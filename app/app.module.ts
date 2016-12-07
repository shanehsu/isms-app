import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service'
import { FormService } from './services/form.service'
import { NewsService } from './services/news.service'
import { RecordService } from './services/record.service'
import { MeService } from './services/me.service'
import { UnitService } from './services/unit.service'
import { UserService } from './services/user.service'

import { pipesModule } from './pipes/pipes.module'
import { formControlsModule } from './controls/form-controls.module'
import { customControlsModule } from './controls/custom-controls.module'
import { directivesModule } from './directives/directives.module'

import { navigationModule } from './navigation/navigation.module'
import { newsModule } from './news/news.module'
import { formsModule } from './forms/forms.module'
import { recordsModule } from './records/records.module'
import { adminModule } from './admin/admin.module'

import { appRoutingModule } from './app.routes'
import { config } from './app.config'

import { NgSemanticModule } from "ng-semantic"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    
    appRoutingModule,
    navigationModule,
    newsModule,
    formsModule,
    recordsModule,
    adminModule,
    
    pipesModule,
    formControlsModule,
    customControlsModule,
    directivesModule,
    
    NgSemanticModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    FormService,
    NewsService,
    RecordService,
    MeService,
    UnitService,
    UserService,
    
    {provide: 'app.config', useValue: config },
    {provide: 'app.debug', useValue: false },
  ]
})

export class AppModule { }
