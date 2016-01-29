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
                    this.hasNewer = false;
                    this.currentPage = 1;
                    this.pieces = [];
                    this._newsService.retrieve().then(function (pieces) {
                        _this.pieces = pieces;
                        _this.piecesView = _this.pieces.slice(0, 10);
                        _this.hasOlder = (pieces.length > 10);
                    });
                };
                NewsComponent.prototype.older = function () {
                    this.hasNewer = true;
                    this.currentPage++;
                    this.hasOlder = this.pieces.length > this.currentPage * 10;
                    this.piecesView = this.pieces.slice((this.currentPage - 1) * 10, this.currentPage * 10);
                };
                NewsComponent.prototype.newer = function () {
                    this.hasOlder = true;
                    this.currentPage--;
                    this.hasNewer = this.currentPage > 1;
                    this.piecesView = this.pieces.slice((this.currentPage - 1) * 10, this.currentPage * 10);
                };
                NewsComponent = __decorate([
                    core_1.Component({
                        selector: 'isms-news',
                        templateUrl: '/app/isms-news/news.template.html'
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