var ISMSApp = angular.module('ISMSClient', [
    'ngRoute',
    'ngStorage',
    'viewControllers',
    'services'
]);

ISMSApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/news', {
            templateUrl: 'views/news.html',
            controller: 'NewsViewController'
        }).
        otherwise({
            redirectTo: '/news'
        });
}]);