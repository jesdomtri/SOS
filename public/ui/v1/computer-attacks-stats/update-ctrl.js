/* global angular */

angular.module("PostmanApp").controller("UpdateCtrlAttacks", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    
    var API = "/api/v1/computer-attacks-stats";
   
    var country = $routeParams.country;
    var year = $routeParams.year;
   

    $http.get(API + "/" + country + "/" + year).then(function(response) {
        $scope.attack = response.data;
    });

    $scope.updateAttack = function(country, year) {
        $http.put(API + "/" + country + "/" + year, $scope.attack).then(function(response) {});
        $location.path("/api/v1/computer-attacks-stats");
    };
}]);
