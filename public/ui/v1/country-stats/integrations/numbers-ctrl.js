/*global angular, Highcharts, unirest, Chartist*/

angular.module("PostmanApp").
controller("numbersCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //API JSON
    var config = {
        headers: {
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
            "X-RapidAPI-Key": "25f48dfb04msh450bc3636166719p1bfbebjsn7dfb27226625"
        }
    };
    
    $http.get("https://numbersapi.p.rapidapi.com/6/21/date?fragment=true&json=true", config).then(function(response) {
        $scope.data = JSON.stringify(response.data, null, 2);
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    });

}]);
