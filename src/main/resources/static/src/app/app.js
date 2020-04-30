'use strict';

var app = angular.module('app', ['ui.load', 'ui.router', 'ngStorage', 'oc.lazyLoad']);

angular.module('app')
    .controller('AppCtrl', ['$scope', '$localStorage', '$window', '$http', '$state', '$rootScope',
        function ($scope, $localStorage, $window, $http, $state) {

        }])
    .factory('httpInterceptor', ['$rootScope', '$location', '$localStorage', '$ctx', function ($rootScope, $location, $localStorage, $ctx) {
        return {
            request: function (config) {
                //放过静态资源
                if (config.url.indexOf(".") >= 0) {
                    return config;
                }
                config.url = $ctx + config.url;
                return config;
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);