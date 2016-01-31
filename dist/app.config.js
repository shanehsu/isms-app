System.register([], function(exports_1) {
    "use strict";
    var config;
    return {
        setters:[],
        execute: function() {
            exports_1("config", config = {
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
                    },
                    {
                        item: "單位",
                        component: "UnitAdmin",
                        route: "/unit",
                        privilege: 1
                    }
                ]
            });
        }
    }
});
//# sourceMappingURL=app.config.js.map