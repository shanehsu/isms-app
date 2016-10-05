"use strict";
exports.config = {
    // endpoint: 'http://infinite-temple-3140.herokuapp.com',
    endpoint: 'http://localhost:3000',
    navigationItems: [
        {
            name: "最新消息",
            path: "news",
            group: 4
        },
        {
            name: "表單",
            path: "forms",
            group: 3
        },
        {
            name: "紀錄",
            path: "records",
            group: 3
        },
        {
            name: "管理",
            path: "admin",
            group: 1
        }
    ],
    adminItems: [
        {
            name: "最新消息",
            path: "news",
            group: 1
        },
        {
            name: "使用者",
            path: "users",
            group: 1
        },
        {
            name: "單位",
            path: "units",
            group: 1
        },
        {
            name: "表單",
            path: "forms",
            group: 1
        }
    ]
};
//# sourceMappingURL=app.config.js.map