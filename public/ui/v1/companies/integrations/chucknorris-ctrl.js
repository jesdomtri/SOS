/*global angular, Highcharts, RGraph*/

angular.module("PostmanApp").
controller("chuckNorrisCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("https://api.chucknorris.io/jokes/random").then(function(response) {
        $scope.data = response.data.value;
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    })

    $scope.refresh = function() {
        $http.get("https://api.chucknorris.io/jokes/random").then(function(response) {
            $scope.data = response.data.value;
            $scope.status = response.status;
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        })
    }


}]);
