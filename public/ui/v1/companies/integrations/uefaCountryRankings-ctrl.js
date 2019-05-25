/*global angular*/

angular.module("PostmanApp").
controller("uefaCountryRankingsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiUCR = "/proxyUefaCountryRankings";

    $http.get(apiUCR).then(function(response) {
        $scope.data = JSON.stringify(response.data, null, 2);
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    })
}]);
