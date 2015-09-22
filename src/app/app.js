'use strict';

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "app/main/main.html",
            data: { pageTitle: 'Main' }
        })
    $urlRouterProvider.otherwise('/index/main');
  })
;
