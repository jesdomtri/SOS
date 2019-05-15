/* global angular */

angular.module("PostmanApp").controller("UpdateCtrlCompanies", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    var API = "/api/v1/companies";
    var country = $routeParams.country;
    var year = $routeParams.year;

    $http.get(API + "/" + country + "/" + year).then(function(response) {
        $scope.company = response.data;
    });

    $scope.updateCompany = function(country, year) {
        $http.put(API + "/" + country + "/" + year, $scope.company).then(function(response) {});
        window.alert('Se ha actualizado correctamente');
        $location.path("/ui/v1/companies");
    }
}]);
