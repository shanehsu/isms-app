import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

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

export class AppComponent {  }
