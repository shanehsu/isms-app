var services = angular.module('services', ['ngResource']);

// Authentication
services.factory('token', ['$resource', '$localStorage', function($resource, $localStorage) {
    console.log('this is still ran!');
    $localStorage.$default({
        token: ''
    });
    return {
        valid: function() {

        },
        get: function() {
            return $localStorage.token;
        }
    };
}]);

// News
services.factory('news', ['$resource', function($resource) {
    return $resource('http://localhost:3000/news/', {}, {
        latest: {method: 'GET', params: {}, isArray: true}
    });
}]);
