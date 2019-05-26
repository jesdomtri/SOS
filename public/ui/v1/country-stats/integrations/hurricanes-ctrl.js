/*global angular, Highcharts, Chartist*/

angular.module("PostmanApp").
controller("hurricanesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiH = "/proxyHurricanes";

    //API JSON

    $http.get(apiH).then(function(response) {
        $scope.data = JSON.stringify(response.data, null, 2);
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    })


    //HIGHCHARTS
    $http.get(apiH).then(function(response) {
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

    $http.get(apiH).then(function(response) {

        var times = function(n) {
            return Array.apply(null, new Array(n));
        };

        var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
            data.labels.push(index + 1);
            data.series.forEach(function(series) {
                series.push(Math.random() * 100)
            });

            return data;
        }, {
            labels: [],
            series: times(4).map(function() { return new Array() })
        });

        var options = {
            showLine: false,
            axisX: {
                labelInterpolationFnc: function(value, index) {
                    return index % 13 === 0 ? 'W' + value : null;
                }
            }
        };

        var responsiveOptions = [
            ['screen and (min-width: 640px)', {
                axisX: {
                    labelInterpolationFnc: function(value, index) {
                        return index % 4 === 0 ? 'W' + value : null;
                    }
                }
            }]
        ];

        new Chartist.Line('.ct-chart', data, options, responsiveOptions);
    })
}]);
