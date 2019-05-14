/* global angular */

angular.module("PostmanApp").controller("UpdateCtrlAttacks", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    
    var API = "/api/v1/computers-attacks-stats";
   
    var country = $routeParams.country;
    var year = $routeParams.year;
    var attacktype =~$routeParams.attacktype;

    $http.get(API + "/" + country + "/" + year+"/"+attacktype).then(function(response) {
        $scope.attack = response.data;
    });

    $scope.updateAttack = function(country, year,attacktype) {
        $http.put(API + "/" + country + "/" + year+"/"+attacktype , $scope.attack).then(function(response) {});
        $location.path("/api/v1/computers-attacks-stats");
    };
}]);
