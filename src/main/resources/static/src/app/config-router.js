'use strict';

var app = angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/data');
        $stateProvider
            .state('main', {
                abstract: true,
                url: '',
                templateUrl: 'src/tpl/main.html'
            })
            .state('main.index', {
                url: '/index',
                templateUrl: 'src/app/index/index.html',
                controller: 'indexController',
                resolve: {
                    deps: ['uiLoad', function (uiLoad) {
                        return uiLoad.load('src/app/index/indexController.js');
                    }]
                }
            })
            .state('main.data', {
                url: '/data',
                templateUrl: 'src/app/data/dataIndex.html',
                controller: 'dataIndexController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/data/dataIndexController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            }).state('main.execute', {
            url: '/execute',
            templateUrl: 'src/app/execute/executeIndex.html',
            controller: 'executeIndexController',
            resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                    return uiLoad.load('src/app/execute/executeIndexController.js').then(function () {
                        return $ocLazyLoad.load('toaster');
                    });
                }]
            }
        })
    }])
    .controller("mainCtrl", function ($rootScope, $http) {

    });