/*global angular,Highcharts,google,Chartist*/

angular.module("PostmanApp").
controller("AnalyticsCtrlStats", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var BASE_API_PATH = "api/v1/country-stats";
    console.log("Controlador de Integración activado");

    $http.get(BASE_API_PATH).then(function(response) {
        console.log("Creando la gráfica Highchart");

        var tabla = [];

        var paisesApi = response.data.map(function(d) { return d.country });
        var anyosApi = response.data.map(function(d) { return d.year });

        var paisesFiltrados = [];
        var anyosFiltrados = [];

        for (var i = 0; i < paisesApi.length; i++) {
            if (!paisesFiltrados.includes(paisesApi[i])) {
                paisesFiltrados.push(paisesApi[i]);
            }
        }
        for (var i = 0; i < anyosApi.length; i++) {
            if (!anyosFiltrados.includes(anyosApi[i])) {
                anyosFiltrados.push(anyosApi[i]);
            }
        }
        for (var i = 0; i < paisesFiltrados.length; i++) {
            tabla.push({
                name: paisesFiltrados[i],
                data: response.data.filter(r => r.country == paisesFiltrados[i])
                    .map(function(d) { return d.population })
            });
        }

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Population growth (2013-2017)'
            },

            xAxis: {
                categories: anyosFiltrados,
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

            series: tabla
        })
    })

    $http.get(BASE_API_PATH).then(function(response) {
        console.log("Creando la gráfica GeoChart");
        google.charts.load('current', { 'packages': ['geochart'] });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var tabla = [];
            tabla.push(['Country', 'Población (2017)']);

            var paisesApi = response.data.map(function(d) { return d.country });
            var anyosApi = response.data.map(function(d) { return d.year });
            var PopApi = response.data.map(function(d) { return d.population });

            for (var i = 0; i < paisesApi.length; i++) {
                if (anyosApi[i] == 2017) {
                    tabla.push([paisesApi[i], PopApi[i]]);
                }
            }



            var data = google.visualization.arrayToDataTable(tabla);
            var options = {};
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }
    })

    $http.get(BASE_API_PATH).then(function(response) {
        console.log("Creando la gráfica Chartist");

        var labels = [];
        var series = [];

        var paisesApi = response.data.map(function(d) { return d.country });
        var anyosApi = response.data.map(function(d) { return d.year });

        var paisesFiltrados = [];

        for (var i = 0; i < paisesApi.length; i++) {
            if (!paisesFiltrados.includes(paisesApi[i])) {
                paisesFiltrados.push(paisesApi[i]);
            }
        }

        labels = paisesFiltrados;

        for (var i = 0; i < paisesFiltrados.length; i++) {
            var aux = (response.data.filter(r => r.country == paisesFiltrados[i])
                .filter(r => r.year == 2017)
                .map(function(d) { return d.population }))
            series.push(aux[0]);
        }

        new Chartist.Line('.ct-chart', {
            labels: labels,
            series: [series]
        }, {
            low: 0,
            showArea: true,
            axisX: {
                offset: 70
            },
            axisY: {
                offset: 70
            }
        });
    })
}]);
