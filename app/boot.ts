"use strict"

import {bootstrap}        from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS}   from '@angular/http';
import {provide}          from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AppComponent}     from './app.component'
import {config}           from './app.config'

import {AuthService} from './services/auth.service'
import {NewsService} from './services/news.service'
import {TokenService} from './services/token.service'

import 'rxjs/add/operator/map'

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    AuthService,
    NewsService,
    TokenService,
    provide('app.config', {useValue: config}),
    provide('app.debug', {useValue: false})
]);