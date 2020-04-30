'use strict';

angular.module('app')
    .controller('dataIndexController', ['$scope', '$http', 'toaster', function ($scope, $http, toaster) {
        $scope.data = {
            wssId: null,
            remote: null,
            local: null,
            whereSql: 'where 1=1',
            wsUrl: null
        };
        $scope.btn = {
            disable: false
        };
        $scope.progress = {
            width: '0%'
        };

        var appendResult = function (result) {
            var syncResult = $("#syncResult");
            var message = syncResult.val() + result + "\n";
            syncResult.val(message);
            syncResult.focus();
            var num = syncResult[0].scrollHeight;
            syncResult.prop("scrollTop", num);
        };

        var wsopen = function () {
            var ws = new WebSocket($scope.data.wsUrl + "/" + $scope.data.wssId);
            ws.onmessage = function (message) {
                var data = JSON.parse(message.data);
                if (data.statusCode === '0000') {
                    if (null != data.record && null != data.record.rate) {
                        $scope.progress.width = data.record.rate + "%";
                        $scope.$apply();
                    }
                    appendResult(data.message);
                }
            };
        };

        $scope.init = function () {
            $http.post("/sync/dbUrls", angular.toJson($scope.data)).then(function (response) {
                var result = response.data;
                if (!result.status) {
                    toaster.pop('error', '', result.message);
                    return false;
                }
                $scope.data.remote = result.record.remoteUrl;
                $scope.data.local = result.record.localUrl;
                $scope.data.wsUrl = result.record.wsUrl;
                $scope.data.wssId = result.record.wssId;
                wsopen();
            });
        };

        $scope.dataSync = function () {
            if (!$scope.data.tableName) {
                toaster.pop('error', '表名不能为空');
                return false;
            }
            if (!$scope.data.whereSql) {
                toaster.pop('error', '同步条件不能为空');
                return false;
            }
            if (!$scope.data.wssId) {
                wsopen();
            }
            $scope.btn.disable = true;
            $http.post("/sync/dataSync", angular.toJson($scope.data)).then(function (response) {
                $scope.btn.disable = false;
                var result = response.data;
                if (!result.status) {
                    toaster.pop('error', '', result.message);
                    return false;
                }
                appendResult(result.message);
            });
        };
        $scope.init();
    }]);