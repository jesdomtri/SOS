/*global angular,Highcharts,google*/

angular.module("PostmanApp").
controller("IntegrationCtrlStats", ["$scope", "$http", "$httpParamSerializer", "$location", function($scope, $http, $httpParamSerializer, $location) {

var BASE_API_PATH = "api/v1/country-stats";

    $http.get(BASE_API_PATH).then(function(response) {
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
                }
            ]
        });
    })
    
    $http.get(BASE_API_PATH).then(function(response) {

        google.charts.load('current', {
            'packages': ['geochart'],

        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                
               
                ['Country', 'Population (2013)'],
                ['France', parseInt(response.data.filter(r=>r.country=="France"&&r.year==2013).map(function(d){return (parseInt(d.population))}))],
                ['EEUU', parseInt(response.data.filter(r=>r.country=="EEUU"&&r.year==2013).map(function(d){return (parseInt(d.population))}))],
                ['Spain', parseInt(response.data.filter(r=>r.country=="Spain"&&r.year==2013).map(function(d){return (parseInt(d.population))}))],
                ['Germany', parseInt(response.data.filter(r=>r.country=="Germany"&&r.year==2013).map(function(d){return (parseInt(d.population))}))],
                ['Italy', parseInt(response.data.filter(r=>r.country=="Italy"&&r.year==2013).map(function(d){return (parseInt(d.population))}))]
         
                  
            ]);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    })
}]);
