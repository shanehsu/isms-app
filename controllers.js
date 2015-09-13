var controllers = angular.module('viewControllers', []);

// 導覽控制器
controllers.controller('NavigationViewController', function($scope, $http) {
    
});

controllers.controller('NewsViewController', ['$scope', '$localStorage', 'news', 'token', function($scope, $localStorage, news, token) {
    /*
        狀態定義：
        -1 - 失敗
         0 - 載入中
         1 - 完成
    */
    
    $scope.state = 0;
    $scope.news = news.latest(function() {
        $scope.state = 1;
    }, function() {
        $scope.state = -1;
    });
    
    $scope.token = token.get();
    
}]);
