"use strict";
const router_1 = require('@angular/router');
let routes = [
    { path: '', redirectTo: 'news', pathMatch: 'full' },
    { path: '**', redirectTo: 'news' }
];
exports.appRoutingModule = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map