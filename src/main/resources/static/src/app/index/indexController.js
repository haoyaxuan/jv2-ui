'use strict';

angular.module('app')
    .controller('indexController', ['$scope', '$http', function ($scope, $http) {
        $scope.funcList = [];
        $scope.init = function () {
            // $http.post("/func/tools").then(function (response) {
            //     var result = response.data;
            //     if (result.resCode == '0000') {
            //         $scope.funcList = result.record.funcList;
            //         angular.forEach($scope.funcList, function (data) {
            //             if(data.url && data.url.indexOf("http://") != -1){
            //                 data.isUrl = 1;
            //             }
            //             if(data.status == '2'){
            //                 data.btnText = "Developing";
            //                 data.btnDisable = true;
            //             }else{
            //                 data.btnText = "Go";
            //                 data.btnDisable = false;
            //             }
            //         });
            //     }
            // });
        };
        $scope.init();
    }]);