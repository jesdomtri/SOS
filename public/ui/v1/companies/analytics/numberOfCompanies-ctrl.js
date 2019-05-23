/*global angular,Highcharts,google*/

angular.module("PostmanApp").
controller("numberOfCompaniesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var api = "/api/v1/companies"

    $http.get(api).then(function(response) {

        var tabla = [];

        var paisesApi = response.data.map(function(d) { return d.country });
        var añosApi = response.data.map(function(d) { return d.year });
        var numCompApi = response.data.map(function(d) { return d.numberOfCompanies });

        for (var i = 0; i < paisesApi.length; i++) {
            if (añosApi[i] == 2017) {
                tabla.push({ name: paisesApi[i], y: numCompApi[i], drilldown: paisesApi[i] });
            }
        }

        console.log(tabla);

        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Número total de compañías'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> companies<br/>'
            },

            series: [{
                name: "Países",
                colorByPoint: true,
                data: tabla
            }]
        });
    })

    $http.get(api).then(function(response) {
        google.charts.load('current', { 'packages': ['geochart'] });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var tabla = [];
            tabla.push(['Country', 'Número de compañias (2017)']);

            var paisesApi = response.data.map(function(d) { return d.country });
            var añosApi = response.data.map(function(d) { return d.year });
            var numCompApi = response.data.map(function(d) { return d.numberOfCompanies });

            for (var i = 0; i < paisesApi.length; i++) {
                if (añosApi[i] == 2017) {
                    tabla.push([paisesApi[i], numCompApi[i]]);
                }
            }

            console.log(tabla);


            var data = google.visualization.arrayToDataTable(tabla);
            var options = {};
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }
    })


}]);
