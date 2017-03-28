import { NgModule, Directive } from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { DragulaModule } from 'ng2-dragula'

import { AppComponent } from './app.component'
import { FloatingComponent } from './floating.component'

import { AuthService } from './services/auth.service'
import { FormService } from './services/form.service'
import { NewsService } from './services/news.service'
import { RecordService } from './services/record.service'
import { MeService } from './services/me.service'
import { UnitService } from './services/unit.service'
import { UserService } from './services/user.service'
import { MessageService } from './services/message.service'
import { DebugService } from './services/debug.service'

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

@Directive({ selector: 'message-header, message-content' })
class NullComponent { }


@NgModule({
  declarations: [
    AppComponent,
    FloatingComponent,
    NullComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule,

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
    MessageService,
    DebugService,

    { provide: 'app.config', useValue: config },
    { provide: 'app.debug', useValue: false },
  ]
})

export class AppModule { }
