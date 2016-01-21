System.register(['angular2/core', './../services/news.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, news_service_1;
    var NewsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (news_service_1_1) {
                news_service_1 = news_service_1_1;
            }],
        execute: function() {
            NewsComponent = (function () {
                function NewsComponent(_newsService) {
                    this._newsService = _newsService;
                }
                NewsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.pieces = [];
                    this._newsService.retrieve().then(function (pieces) { return _this.pieces = pieces; }).then(function (pieces) { return console.log(pieces); });
                };
                NewsComponent = __decorate([
                    core_1.Component({
                        selector: 'isms-news',
                        template: "\n    <div class=\"container\">\n      <h2>\u6700\u65B0\u6D88\u606F</h2>\n      <table class=\"table table-striped\" ng-if=\"state == 1\">\n          <thead>\n              <tr>\n                  <th>\u65E5\u671F</th>\n                  <th>\u4F86\u6E90</th>\n                  <th>\u65B0\u805E\u7C21\u4ECB</th>\n              </tr>\n          </thead>\n          <tbody>\n              <tr *ngFor=\"#piece of pieces\">\n                  <td>{{piece.date | date: 'longDate'}}</td>\n                  <td>{{piece.source}}</td>\n                  <td><a [href]=\"piece.link\">{{piece.summary}}</a></td>\n              </tr>\n          </tbody>\n      </table>\n    </div>\n    ",
                        providers: [news_service_1.NewsService]
                    }), 
                    __metadata('design:paramtypes', [news_service_1.NewsService])
                ], NewsComponent);
                return NewsComponent;
            })();
            exports_1("NewsComponent", NewsComponent);
        }
    }
});
//# sourceMappingURL=news.component.js.map