/* global angular */

angular.module("PostmanApp").controller("UpdateCtrlCompanies", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    var API = "/api/v1/companies";
    var country = $routeParams.country;
    var year = $routeParams.year;

    $http.get(API + "/" + country + "/" + year).then(function(response) {
        $scope.company = response.data;
    });

    $scope.updateCompany = function(country, year) {
        $http.put(API + "/" + country + "/" + year, {
            country: $scope.company.country,
            year: parseInt($scope.company.year),
            numberOfCompanies: parseInt($scope.company.numberOfCompanies),
            sector: parseInt($scope.company.sector),
            page: parseInt($scope.company.page)
        }).then(function(response) {
            window.alert('Se ha actualizado correctamente');
            $location.path("/ui/v1/companies");
        }, function(error) {
            window.alert('Error: Debe introducir valores correctamente para todos los parámetros');
        });
    }
}]);
