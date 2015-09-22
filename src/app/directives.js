'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('inspinia')
  .directive('order', function () {
    return {
      restrict: 'A',
      scope : {
        dataset : '=',
        options : '='
      },
      link: function (scope, elem, attrs) {

        var chart = null;

         scope.$watch('dataset', function (v) {
          if (!chart) {
            chart = $.plot(elem, v, {});
            elem.show();
          } else {
            chart.setData(v);
            chart.draw();
          }
        }, true);
      }
    };
  })

  .directive('sideNavigation', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        // Call metsi to build when user signup
        scope.$watch('authentication.user', function () {
          $timeout(function () {
            element.metisMenu();
          });
        });

      }
    };
  })
  .directive('minimalizaSidebar', function ($timeout) {
    return {
      restrict: 'A',
      template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
      controller: function ($scope, $element) {
        $scope.minimalize = function () {
          angular.element('body').toggleClass('mini-navbar');
          if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            angular.element('#side-menu').hide();
            // For smoothly turn on menu
            $timeout(function () {
              angular.element('#side-menu').fadeIn(500);
            }, 100);
          } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            angular.element('#side-menu').removeAttr('style');
          }
        };
      }
    };
  });


