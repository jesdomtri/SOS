/* global angular */

angular.module("PostmanApp").controller("UpdateCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    var API = "/api/v1/country-stats";
    var country = $routeParams.country;
    var year = $routeParams.year;

    $http.get(API + "/" + country + "/" + year).then(function(response) {
        $scope.stat = response.data;
    });

    $scope.updateStat = function(country, year) {
        $http.put(API + "/" + country + "/" + year, $scope.stat).then(function(response) {});
        $location.path("/");
    }
}]);
