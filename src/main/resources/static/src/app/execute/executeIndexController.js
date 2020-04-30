'use strict';

angular.module('app')
    .controller('executeIndexController', ['$scope', '$http', 'toaster', function ($scope, $http, toaster) {
        $scope.data = {
            remote: null,
            executeSql: null,
            type: 'execute'
        };
        $scope.btn = {
            disable: false
        };

        $scope.init = function () {
            $http.post("/sync/dbUrls", angular.toJson($scope.data)).then(function (response) {
                var result = response.data;
                if (!result.status) {
                    toaster.pop('error', '', result.message);
                    return false;
                }
                $scope.data.remote = result.record.biwiseyeUrl;
            });
        };

        $scope.execute = function () {
            if (!$scope.data.executeSql) {
                toaster.pop('error', '执行SQL不能为空');
                return false;
            }
            $scope.btn.disable = true;
            $http.post("/sync/execute", angular.toJson($scope.data)).then(function (response) {
                $scope.btn.disable = false;
                var result = response.data;
                $scope.data.result = result.message;
            });
        };
        $scope.init();
    }]);