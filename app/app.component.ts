import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthService } from './services/auth.service'
import { DebugView, DebugService } from './services/debug.service'
import { FloatingComponent } from './views/floating.component'
import { Message, MessageService } from './services/message.service'

@Component({
  selector: 'isms-app',
  template: `
    <div class="ui container">
      <wizard [canNext]="true" [canPrevious]="false">
        <step>
          <p>I am first step.</p>
        </step>
        <step>
          <p>I am second step.</p>
        </step>
      </wizard>
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
      <table class="ui celled table" style="table-layout: fixed;">
        <thead>
          <tr>
            <th>元件</th>
            <th>子系統</th>
            <th>名稱</th>
          </tr>
          <tr>
            <th colspan="3">值</th>
          </tr>
        </thead>
        <tbody>
          <template ngFor [ngForOf]="debuggables" let-debuggable>
            <tr>
              <td>{{debuggable.source}}</td>
              <td>{{debuggable.section ? debuggable.section : '' }}</td>
              <td>{{debuggable.name}}</td>
            </tr>
            <tr>
              <td colspan="3">
                <pre><code>{{debuggable.value | json}}</code></pre>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </float>
    `,
  styles: [
    ".message-panel { position: fixed; bottom: 0; right: 20pt; max-width: 30em; width: 40%; max-height: 12em; overflow-x: scroll; z-index: 10; }",
    "pre code { font-family: 'SFMono-Regular', 'Courier New', monospace; }"
  ]
})

export class AppComponent implements OnInit {
  @ViewChild(FloatingComponent) debug: FloatingComponent

  private messages: Message[]
  private debuggables: DebugView[]

  ngOnInit(): void {
    this.messages = []
    this.debuggables = []

    this.messageService.messages.subscribe(messages => this.messages = messages)
    this.debugService.debuggables.subscribe(debuggables => this.debuggables = debuggables)

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
