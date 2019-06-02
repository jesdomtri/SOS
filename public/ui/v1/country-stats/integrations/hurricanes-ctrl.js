/*global angular, Highcharts, Chartist*/

angular.module("PostmanApp").
controller("hurricanesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiHR = "/proxyHurricanes";

    //HIGHCHARTS
    $http.get(apiHR).then(function(response) {
        var tabla = [];
        var speedApiFinal = [];
        var nameFiltrados = [];

        var nameApi = response.data.map(function(d) { return d.name });
        var anyosApi = response.data.map(function(d) { return d.year });
        var speedApi = response.data.map(function(d) { return d.speed });

        for (var i = 0; i < nameApi.length; i++) {
            if (!nameFiltrados.includes(nameApi[i])) {
                if (anyosApi[i] == 2008) {
                    nameFiltrados.push(nameApi[i]);
                    speedApiFinal.push(speedApi[i]);
                }
            }
        }

        for (var i = 0; i < nameFiltrados.length; i++) {
            tabla.push(
                [nameFiltrados[i], parseInt(speedApi[i])]
            );
        }
        
        console.log(tabla);

        Highcharts.chart('container', {
            chart: {
                type: 'pyramid3d',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    depth: 50,
                    viewDistance: 50
                }
            },
            title: {
                text: 'Highcharts Pyramid3D Chart'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> ({point.y:,.0f})',
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        allowOverlap: true,
                        x: 10,
                        y: -5
                    },
                    width: '60%',
                    height: '80%',
                    center: ['50%', '45%']
                }
            },
            series: [{
                name: 'Hurricanes speed in 2008',
                data: tabla
            }]
        });
    })
}]);
