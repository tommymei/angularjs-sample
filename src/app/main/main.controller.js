'use strict';

angular.module('inspinia')
  .controller('MainCtrl', ['$scope', '$http', '$window', '$interval', function ($scope, $http, $window,$interval) {
    // TODO: make this configureable 
    var server = "localhost:8080";
    // default 
    $scope.lastFetchTime = undefined;
    $scope.isFetchMode = true;

    $scope.setFetchMode = function() {
      if ($scope.lastFetchTime === undefined) {
        $scope.isFetchMode = true;
        return;
      }

      var d = new Date();
      var currentTime = d.getTime();

      // 15 seconds elapse
      if (currentTime - $scope.lastFetchTime >= 15000) {
        $scope.isFetchMode = true;
        return;
      }

      $scope.isFetchMode = false;
      return;
    }

    $scope.getFetchLabel = function () {
      return $scope.isFetchMode ? 'Fetch - Click Me!' : 'Fetch - Disabled';
    }

    $scope.getSetLabel = function () {
      return !$scope.isFetchMode ? 'Set - Click Me!' : 'Set - Disabled';
    }

    // ----- Fetch Function call
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
        $scope.lastFetchTime = new Date().getTime();
        $scope.setFetchMode();
      });
      getRes.error(function (data) {
        alert('error on fetch');
      });
    }

    // --- Set Function call
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
          $scope.lastFetchTime = undefined;
          $scope.setFetchMode();
          $window.document.body.style.backgroundColor = 'rgb(' + $scope.red + ',' + $scope.green + ',' + $scope.blue + ')';
        } else {
          // need this because someone else might have grabbed it, client and server are not in lock step of the 15 seconds
          // rare case but it could happen.
          alert('ooops, you either did not set in time or something went wrong');
        }
      });
      getRes.error(function (data) {
        alert('error on set');
      });
    }

    // recompute fetch mode every 1 second
    $interval(function() {
         $scope.setFetchMode();
    }, 1000);
  }]);
