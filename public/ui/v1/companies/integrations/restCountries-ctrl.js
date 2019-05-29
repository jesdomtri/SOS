/*global angular, unirest, google*/

angular.module("PostmanApp").
controller("restCountriesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("https://restcountries.eu/rest/v2/all").then(function(response) {
        //$scope.data = JSON.stringify(response.data, null, 2);
        var datos = [];
        for (var i = 0; i < response.data.length; i++) {
            datos.push({ name: response.data[i].name, population: response.data[i].population });
        }
        $scope.data = JSON.stringify(datos, null, 2);
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    })

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
