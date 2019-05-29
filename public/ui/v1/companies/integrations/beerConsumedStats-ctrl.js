/*global angular, Chartist, RGraph*/

angular.module("PostmanApp").
controller("beerConsumedStatsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiBCS = "/proxyBeerConsumedStats";

    //API JSON

    $http.get(apiBCS).then(function(response) {
        $scope.datos = response.data;
        $scope.status = response.status;
    }, function(response) {
        $scope.datos = response.data || 'Request failed';
        $scope.status = response.status;
    })


    //HIGHCHARTS
    $http.get(apiBCS).then(function(response) {

        var paisesApi = response.data.map(function(d) { return d.country });
        var añosApi = response.data.map(function(d) { return d.year });
        var consumitionApi = response.data.map(function(d) { return d.countryConsumition });

        var paisesFinales = [];
        var consFinales = [];

        for (var i = 0; i < paisesApi.length; i++) {
            if (añosApi[i] == 2017) {
                paisesFinales.push(paisesApi[i]);
                consFinales.push(consumitionApi[i]);
            }
        }

        new Chartist.Line('.ct-chart', {
            labels: paisesFinales,
            series: [consFinales]
        }, {
            low: 0,
            showArea: true
        });
    })

}]);
