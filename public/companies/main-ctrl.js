/* global angular */
var app = angular.module("PostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Modular MainCtrl initialized");
    $scope.url = "/api/v1/companies";
    $scope.get = function() {
        $http.get($scope.url).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
        });
    }
    $scope.loadinitial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    }
    $scope.del = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    }
    $scope.post = function() {
        $http.post($scope.url, {
            country: $scope.country,
            year: parseInt($scope.year),
            numberOfCompanies: parseInt($scope.numberOfCompanies),
            sector: parseInt($scope.sector),
            page: parseInt($scope.page)
        }).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    }
    $scope.put = function() {
        $http.put($scope.url, {
            country: $scope.country,
            year: parseInt($scope.year),
            numberOfCompanies: parseInt($scope.numberOfCompanies),
            sector: parseInt($scope.sector),
            page: parseInt($scope.page)
        }).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    }
}]);
