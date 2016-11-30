"use strict";
// export type Group = "admins" | "securityPersonnel" | "users" | "vendors" | "guests"
exports.config = {
    // endpoint: 'http://infinite-temple-3140.herokuapp.com',
    endpoint: 'http://localhost:3000/api/v2',
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
};
//# sourceMappingURL=app.config.js.map