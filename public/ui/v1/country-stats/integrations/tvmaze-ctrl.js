/*global angular, Highcharts, unirest, Chartist, google*/

angular.module("PostmanApp").
controller("tvmazeCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //API JSON
    var config = {
        headers: {
            "X-RapidAPI-Host": "tvjan-tvmaze-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "25f48dfb04msh450bc3636166719p1bfbebjsn7dfb27226625"
        }
    };

    $http.get("https://tvjan-tvmaze-v1.p.rapidapi.com/schedule?filter=primetime", config).then(function(response) {

        var seasonct;
        var nameapi;
        var tabla = [];

        tabla.push(['Show name', 'Seasons']);

        for (var i = 0; i < response.data.length; i++) {
            
            seasonct = response.data[i].season;
            nameapi = response.data[i].name;
            tabla.push([nameapi, seasonct]);
        }

        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable(tabla);

            var options = {
                title: 'Number of seasons from Primetime',
                pieHole: 0.4,
            };

            var chart = new google.visualization.PieChart(document.getElementById('tvmaze_div'));
            chart.draw(data, options);
        }

    })
}]);
