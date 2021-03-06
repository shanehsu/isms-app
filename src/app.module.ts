import { NgModule, Directive, ErrorHandler, Injectable } from '@angular/core'

import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { DragulaModule } from 'ng2-dragula'

import { AppComponent } from './app.component'
import { FloatingComponent } from './views/floating.component'

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
import { wizardModule } from './views/wizard/wizard.module'

import { navigationModule } from './navigation/navigation.module'
import { newsModule } from './news/news.module'
import { formsModule } from './forms/forms.module'
import { recordsModule } from './records/records.module'
import { adminModule } from './admin/admin.module'

import { appRoutingModule } from './app.routes'
import { config } from './app.config'

import { NgSemanticModule } from "ng-semantic"

@Injectable()
class MyErrorHandler implements ErrorHandler {
  constructor(private messageService: MessageService) { }
  handleError(error: any) {
    this.messageService.error("Angular 2 錯誤", "請檢查 Console")
    console.dir(error)
  }
}

@Directive({ selector: 'message-header, message-content' })
class NullDirective { }

@NgModule({
  declarations: [
    AppComponent,
    FloatingComponent,
    NullDirective
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
    wizardModule,

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
    { provide: ErrorHandler, useClass: MyErrorHandler }
  ]
})

export class AppModule { }
