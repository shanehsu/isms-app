"use strict"

import {NavigationItem} from './types/navigation-item'
import {Config} from './types/config'

export var config: Config = {
    // endpoint: 'http://infinite-temple-3140.herokuapp.com',
    endpoint: 'http://localhost:3000',
    navigationItems: [
      {
        item: "最新消息",
        component: "News",
        route: "/news",
        privilege: 4
      },
      {
        item: "管理",
        component: "Admin",
        route: "/admin",
        privilege: 1
      }
    ],
    adminItems: [
      {
        item: "最新消息",
        component: "NewsAdmin",
        route: "/news",
        privilege: 1
      },
      {
        item: "使用者",
        component: "UserAdmin",
        route: "/user",
        privilege: 1
      }
    ]
}
