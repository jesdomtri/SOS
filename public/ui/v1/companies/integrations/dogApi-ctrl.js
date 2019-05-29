/*global angular, Highcharts*/

angular.module("PostmanApp").
controller("dogApiCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    $http.get("https://dog.ceo/api/breeds/list/all").then(function(response) {
        $scope.datos = response.data.message;
        $scope.status = response.status;
        console.log($scope.datos);
    });
}]);
