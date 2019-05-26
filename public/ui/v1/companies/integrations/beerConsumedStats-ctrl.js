/*global angular, Highcharts, RGraph*/

angular.module("PostmanApp").
controller("beerConsumedStatsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiBCS = "/proxyBeerConsumedStats";

    //API JSON

    $http.get(apiBCS).then(function(response) {
        $scope.data = JSON.stringify(response.data, null, 2);
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    })


    //HIGHCHARTS
    $http.get(apiBCS).then(function(response) {
        var tabla = [];

        var paisesApi = response.data.map(function(d) { return d.country });
        var añosApi = response.data.map(function(d) { return d.year });
        var consumitionApi = response.data.map(function(d) { return d.countryConsumition });

        for (var i = 0; i < paisesApi.length; i++) {
            if (añosApi[i] == 2017) {
                tabla.push({ name: paisesApi[i], consumition: consumitionApi[i] });
            }
        }

        tabla.sort(function(a, b) {
            if (a.consumition < b.consumition) {
                return 1;
            }
            if (a.consumition > b.consumition) {
                return -1;
            }
            return 0;
        });

        var tablaFinal = [];

        for (var i = 0; i < tabla.length; i++) {
            tablaFinal.push([tabla[i].name, tabla[i].consumition]);
        }

        console.log(tablaFinal);

        Highcharts.chart('container', {
            chart: {
                type: 'pyramid'
            },
            title: {
                text: '',
                x: -50
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> ',
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        softConnector: true
                    },
                    center: ['40%', '50%'],
                    width: '80%'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Consumición',
                data: tablaFinal
            }]
        });
    })

}]);
