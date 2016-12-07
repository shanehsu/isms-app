import { Component, OnInit } from '@angular/core';
import {  } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service'

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
    </div>
    `
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
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
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }
}
