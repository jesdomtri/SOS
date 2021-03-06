/*global angular, unirest, google*/

angular.module("PostmanApp").
controller("restCountriesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("https://restcountries.eu/rest/v2/all").then(function(response) {
        google.charts.load('current', { 'packages': ['geochart'] });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var tabla = [];
            tabla.push(['Country', 'Population']);

            var paises = response.data.map(function(d) { return d.name });
            var population = response.data.map(function(d) { return d.population });

            for (var i = 0; i < paises.length; i++) {
                tabla.push([paises[i], population[i]]);
            }
            console.log(tabla);

            var data = google.visualization.arrayToDataTable(tabla);
            var options = {};
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }
    })

}]);
