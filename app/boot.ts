"use strict"

import {bootstrap}        from 'angular2/platform/browser'
import {HTTP_PROVIDERS}   from 'angular2/http';
import {provide}          from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent}     from './app.component'
import {config}           from './app.config'

import {AuthService} from './services/auth.service'
import {NewsService} from './services/news.service'
import {TokenService} from './services/token.service'

import 'rxjs/Rx';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    AuthService,
    NewsService,
    TokenService,
    provide('app.config', {useValue: config})
]);