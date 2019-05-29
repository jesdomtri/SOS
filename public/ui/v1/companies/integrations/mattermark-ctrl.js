/*global angular, Highcharts*/

angular.module("PostmanApp").
controller("mattermarkCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var config = {
        headers: {
            "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "0b4ef1175emsh16a660bcab25a09p1bfde3jsn267c22bc6ddc"
        }
    };

    $http.get("https://restcountries-v1.p.rapidapi.com/all", config).then(function(response) {
        $scope.data = JSON.stringify(response.data, null, 2);
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    });

}]);
