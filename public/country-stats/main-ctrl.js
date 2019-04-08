/* global angular */
var app = angular.module("PostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Modular MainCtrl initialized");
    $scope.url = "/api/v1/country-stats";
    $scope.get = function() {
        $http.get($scope.url).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    }
    $scope.loadinitial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    }
    $scope.del = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    }
    $scope.post = function() {
        $http.post($scope.url, {
            country: $scope.country,
            year: parseInt($scope.year),
            extensionOfBorders: parseInt($scope.numberOfCompanies),
            population: parseInt($scope.sector),
            territorialExtension: parseInt($scope.page)
        }).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);

        });
    }
    $scope.put = function() {
        $http.put($scope.url, {
            country: $scope.country,
            year: parseInt($scope.year),
            extensionOfBorders: parseInt($scope.numberOfCompanies),
            population: parseInt($scope.sector),
            territorialExtension: parseInt($scope.page)
        }).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    }
}]);
