"use strict"

import {Config} from './types/config'

export var config: Config = {
  // endpoint: 'http://infinite-temple-3140.herokuapp.com',
  endpoint: 'http://localhost:3000',
  navigationItems: [
    {
      name: "最新消息",
      path: "/news",
      group: 4
    },
    {
      name: "表單",
      path: "/form",
      group: 3
    },
    {
      name: "管理",
      path: "/admin",
      group: 1
    }
  ],
  adminItems: [
    {
      name: "最新消息",
      path: "/news",
      group: 1
    },
    {
      name: "使用者",
      path: "/user",
      group: 1
    },
    {
      name: "單位",
      path: "/unit",
      group: 1
    },
    {
      name: "表單",
      path: "/form",
      group: 1
    }
  ]
}
