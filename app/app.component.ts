import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthService } from './services/auth.service'
import { DebugItem, DebugService } from './services/debug.service'
import { FloatingComponent } from './floating.component'
import { Message, MessageService } from './services/message.service'

@Component({
  selector: 'isms-app',
  template: `
    <div class="ui container">
      <div class="ui fluid container" style="margin-top: 1em; margin-bottom: 2em;">
        <isms-nav></isms-nav>
      </div>
      <div class="ui container">
        <router-outlet></router-outlet>
      </div>
      <button class="ui fluid red button" (click)="debug.show()" style="margin-top: 2em;">顯示偵錯窗格</button>
    </div>
    <div class="message-panel">
      <sm-message *ngFor="let message of messages" [class]="message.class" [icon]="message.icon">
        <message-header>
          {{message.header}}
        </message-header>
        <message-content>
          {{message.content}}
        </message-content>
      </sm-message>
    </div>
    <float [header]="'偵錯資訊'">
      <pre>{{debugItems | json}}</pre>
    </float>
    `,
  styles: [
    ".message-panel { position: fixed; bottom: 0; right: 20pt; max-width: 30em; width: 40%; max-height: 12em; overflow-x: scroll; z-index: 10; }"
  ]
})

export class AppComponent implements OnInit {
  @ViewChild(FloatingComponent) debug: FloatingComponent

  private messages: Message[]
  private debugItems: DebugItem[]

  ngOnInit(): void {
    this.messages = []
    this.debugItems = []

    this.messageService.messages.subscribe(messages => this.messages = messages)
    this.debugService.items.subscribe(items => this.debugItems = items)

    this.activatedRoute.queryParams.subscribe((query: any) => {
      if (query.sso && query.token) {

        let withoutSSO: any = {}
        Object.apply(withoutSSO, query)
        delete withoutSSO.sso
        delete withoutSSO.token

        this.authService.authenticate_sso(query.token).then(_ => {
          this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: withoutSSO })
        }).catch(err => {
          this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: withoutSSO })
        })
      }
    })
  }
  constructor(private authService: AuthService, private messageService: MessageService,
    private debugService: DebugService,
    private router: Router, private activatedRoute: ActivatedRoute) { }
}
