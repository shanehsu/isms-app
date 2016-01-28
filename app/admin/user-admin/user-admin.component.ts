import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'user-admin',
    template:`Hello World!
    `,
})

export class UserAdminComponent implements OnInit {
  ngOnInit() {
    console.log("Hello World?");
  }
  
  constructor() {}
}
