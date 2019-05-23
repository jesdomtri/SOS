/*global angular,Highcharts,google*/

angular.module("PostmanApp").
controller("IntegrationCtrlStats", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var BASE_API_PATH = "api/v1/country-stats";
    console.log("Controlador de Integración activado");

    $http.get(BASE_API_PATH).then(function(response) {
        console.log("Creando la gráfica Highchart");

        var tabla = [];

        var paisesApi = response.data.map(function(d) { return d.country });
        var añosApi = response.data.map(function(d) { return d.year });
        var popApi = response.data.map(function(d) { return d.population });
        
        var paisesFiltrados;
        
        for(var i = 0; i < paisesApi.length; i++){
            if(!(paisesFiltrados.contains(paisesApi[i]))){
                paisesFiltrados.push(paisesApi[i]);
            }
        }
        console.log(paisesFiltrados);

        for (var i = 0; i < paisesFiltrados.length; i++) {
                tabla.push({ name: paisesFiltrados[i], data: popApi[i] });
        }
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Population growth (2013-2017)'
            },

            xAxis: {
                categories: añosApi,
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
        console.log("Creando gráfica GeoChart");
        google.charts.load('current', { 'packages': ['geochart'] });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var tabla = [];
            tabla.push(['Country', 'Población (2017)']);

            var paisesApi = response.data.map(function(d) { return d.country });
            var añosApi = response.data.map(function(d) { return d.year });
            var PopApi = response.data.map(function(d) { return d.population });

            for (var i = 0; i < paisesApi.length; i++) {
                if (añosApi[i] == 2017) {
                    tabla.push([paisesApi[i], PopApi[i]]);
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
