"use strict"

import { Config } from './types/config'

export var config: Config = {
  endpoint: 'http://127.0.0.1:10000/api/v2', //'$$endpoint$$',
  ssoUrl: 'http://127.0.0.1:10000/sso',
  navigationItems: [
    {
      name: "最新消息",
      path: "news",
      group: ["guests", "vendors", "users", "securityPersonnel", "admins"]
    },
    {
      name: "表單",
      path: "forms",
      group: ["vendors", "users", "securityPersonnel", "admins"],
      roles: ['agent', 'vendor']
    },
    {
      name: "紀錄",
      path: "records",
      group: ["vendors", "users", "securityPersonnel", "admins"]
    },
    {
      name: "管理",
      path: "admin",
      group: ["admins"]
    }
  ],
  adminItems: [
    {
      name: "最新消息",
      path: "news",
      group: ["admins"]
    },
    {
      name: "使用者",
      path: "users",
      group: ["admins"]
    },
    {
      name: "單位",
      path: "units",
      group: ["admins"]
    },
    {
      name: "表單",
      path: "forms",
      group: ["admins"]
    }
  ]
}
