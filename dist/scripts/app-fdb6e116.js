"use strict";angular.module("inspinia",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap"]).config(["$stateProvider","$urlRouterProvider",function(e,n){e.state("main",{url:"/main",templateUrl:"app/main/main.html",data:{pageTitle:"Main"}}),n.otherwise("/index/main")}]),angular.module("inspinia").controller("MainCtrl",["$scope","$http","$window",function(e,n,i){var t="localhost:8080";e.isFetchMode=!0,e.getFetchLabel=function(){return e.isFetchMode?"Fetch - Click Me!":"Fetch - Disabled"},e.getSetLabel=function(){return e.isFetchMode?"Set - Disabled":"Set - Click Me!"},e.fetch=function(){var i=n.get("http://"+t+"/backend/queue/fetch");i.success(function(n){if(void 0===n)throw"data is undefined";e.id=n.id,e.red=n.red,e.blue=n.blue,e.green=n.green,e.isFetchMode=!1}),i.error(function(){alert("error on fetch")})},e.set=function(){if(void 0===e.id)throw"id is undefined";var a=n.get("http://"+t+"/backend/queue/set/"+e.id);a.success(function(n){if(void 0===n)throw"data is undefined";"success"===n.response&&(e.isFetchMode=!0,i.document.body.style.backgroundColor="rgb("+e.red+","+e.green+","+e.blue+")")}),a.error(function(){alert("error on set")})}}]),$(document).ready(function(){function e(){var e=$("body > #wrapper").height()-61;$(".sidebard-panel").css("min-height",e+"px");var n=$("nav.navbar-default").height(),i=$("#page-wrapper").height();n>i&&$("#page-wrapper").css("min-height",n+"px"),i>n&&$("#page-wrapper").css("min-height",$(window).height()+"px")}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||e()}),setTimeout(function(){e()})}),$(function(){$(window).bind("load resize",function(){$(this).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")})}),angular.module("inspinia").directive("order",function(){return{restrict:"A",scope:{dataset:"=",options:"="},link:function(e,n){var i=null;e.$watch("dataset",function(e){i?(i.setData(e),i.draw()):(i=$.plot(n,e,{}),n.show())},!0)}}}).directive("sideNavigation",["$timeout",function(e){return{restrict:"A",link:function(n,i){n.$watch("authentication.user",function(){e(function(){i.metisMenu()})})}}}]).directive("minimalizaSidebar",["$timeout",function(e){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',controller:["$scope","$element",function(n){n.minimalize=function(){angular.element("body").toggleClass("mini-navbar"),!angular.element("body").hasClass("mini-navbar")||angular.element("body").hasClass("body-small")?(angular.element("#side-menu").hide(),e(function(){angular.element("#side-menu").fadeIn(500)},100)):angular.element("#side-menu").removeAttr("style")}}]}}]),angular.module("inspinia").run(["$templateCache",function(e){e.put("app/main/main.html",'<br><br><button name="fetch" ng-disabled="!isFetchMode" ng-click="fetch()" style="width: 200px; height: 100px;">{{getFetchLabel()}}</button><br><br><button name="set" ng-disabled="isFetchMode" ng-click="set()" style="width: 200px; height: 100px;">{{getSetLabel()}}</button>'),e.put("components/common/content.html",'<div id="wrapper"><div ng-include="\'components/common/navigation.html\'"></div><div id="page-wrapper" class="gray-bg {{$state.current.name}}"><div ng-include="\'components/common/topnavbar.html\'"></div><div ui-view=""></div><div ng-include="\'components/common/footer.html\'"></div></div></div>'),e.put("components/common/footer.html",'<div class="footer"><div class="pull-right"></div><div><strong>Copyright</strong> &copy; 2015</div></div>'),e.put("components/common/ibox_tools.html",'<div class="ibox-tools dropdown" dropdown=""><a ng-click="showhide()"><i class="fa fa-chevron-up"></i></a> <a class="dropdown-toggle" href="" dropdown-toggle=""><i class="fa fa-wrench"></i></a><ul class="dropdown-menu dropdown-user"><li><a href="">Config option 1</a></li><li><a href="">Config option 2</a></li></ul><a ng-click="closebox()"><i class="fa fa-times"></i></a></div>'),e.put("components/common/navigation.html",'<nav class="navbar-default navbar-static-side" role="navigation"><div class="sidebar-collapse"><ul side-navigation="" class="nav" id="side-menu"><li class="nav-header"><div class="dropdown profile-element" dropdown=""><a class="dropdown-toggle" dropdown-toggle="" href=""><span class="clear"><span class="block m-t-xs"><strong class="font-bold">{{main.userName}}</strong></span> <span class="text-muted text-xs block">Menu<b class="caret"></b></span></span></a><ul class="dropdown-menu animated fadeInRight m-t-xs"><li><a href="">Logout</a></li></ul></div><div class="logo-element">IN+</div></li><li ui-sref-active="active"><a ui-sref="index.main"><i class="fa fa-laptop"></i> <span class="nav-label">Main page</span></a></li></ul></div></nav>'),e.put("components/common/topnavbar.html","")}]);