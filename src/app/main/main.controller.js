'use strict';

angular.module('inspinia')
  .controller('MainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    // TODO: make this configureable 
    var server = "localhost:8080";
    // default 
    $scope.isFetchMode = true;

    $scope.getFetchLabel = function () {
      return $scope.isFetchMode ? 'Fetch - Click Me!' : 'Fetch - Disabled';
    }

    $scope.getSetLabel = function () {
      return !$scope.isFetchMode ? 'Set - Click Me!' : 'Set - Disabled';
    }

    $scope.fetch = function () {
      var getRes = $http.get('http://' + server + '/backend/queue/fetch');
      getRes.success(function (data) {
        if (data === undefined) {
          throw 'data is undefined';
        }

        $scope.id = data.id;
        $scope.red = data.red;
        $scope.blue = data.blue;
        $scope.green = data.green;
        $scope.isFetchMode = false;
      });
      getRes.error(function (data) {
        alert('error on fetch');
      });
    }

    $scope.set = function () {

      if ($scope.id === undefined) {
        throw 'id is undefined';
      }

      var getRes = $http.get('http://' + server + '/backend/queue/set/' + $scope.id);
      getRes.success(function (data) {
        if (data === undefined) {
          throw 'data is undefined';
        }
        if (data.response === 'success') {
          $scope.isFetchMode = true;
          $window.document.body.style.backgroundColor = 'rgb(' + $scope.red + ',' + $scope.green + ',' + $scope.blue + ')';
        }
      });
      getRes.error(function (data) {
        alert('error on set');
      });
    }

    /*    $interval(function() {       $scope.message = {         time: $window.moment().format('MMMM Do YYYY, h:mm:ss a')       };     }, 1000);*/
  }]);
