"use strict"

import { Config } from './types/config'

export var config: Config = {
  endpoint: '$$endpoint$$',
  ssoUrl: '$$ssourl$$',
  navigationItems: [
    {
      name: "最新消息",
      path: "news",
      group: ["guests", "vendors", "users", "securityPersonnel", "admins"]
    },
    {
      name: "表單",
      path: "forms",
      group: ["vendors", "users", "securityPersonnel", "admins"]
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
