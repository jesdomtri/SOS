/*global angular,Highcharts,google*/

angular.module("PostmanApp").
controller("IntegrationCtrlStats", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("api/v1/country-stats").then(function(response) {
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Population growth (2013-2017)'
            },

            xAxis: {
                categories: ['2013', '2014', '2015', '2016', '2017'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {

            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },

            series: [{
                name: 'Germany',
                data: response.data.filter(r => r.country == 'Germany').map(function(r) { return r.population })
            },
            {
                name: 'France',
                data: response.data.filter(r => r.country == 'France').map(function(r) { return r.population })
            },
            {
                name: 'EEUU',
                data: response.data.filter(r => r.country == 'EEUU').map(function(r) { return r.population })
            },
            {
                name: 'Spain',
                data: response.data.filter(r => r.country == 'Spain').map(function(r) { return r.population })
            },
            {
                name: 'Italy',
                data: response.data.filter(r => r.country == 'Italy').map(function(r) { return r.population })
            }]
        });
    })
}]);
