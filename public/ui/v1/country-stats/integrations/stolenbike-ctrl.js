/*global angular, Highcharts, unirest, Chartist, google*/

angular.module("PostmanApp").
controller("stolenbikeCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //API JSON
    var config = {
        headers: {
            "X-RapidAPI-Host": "stolenbikes88-checkthatbike-global-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "25f48dfb04msh450bc3636166719p1bfbebjsn7dfb27226625"
        }
    };

    $http.get("https://stolenbikes88-checkthatbike-global-v1.p.rapidapi.com/get.json?check=all&frame=WUD092050549E", config).then(function(response) {
        console.log(response.data.results);
        var numberctNO = 0;
        var numberctYES = 0;
        var tabla = [];

        tabla.push(["Bikes founded", "NumberOf"]);
    
        for (var i = 0; i < response.data.results.length; i++) {
            if(response.data.results[i].resultBoolean == 1){
                numberctYES = numberctYES + 1;
            } else {
                numberctNO = numberctNO + 1;
            }
        }
        
        tabla.push(["Founded", numberctYES]);
        tabla.push(["Not Founded", numberctNO]);
        
        console.log(tabla);
        
        google.charts.load("current", { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable(tabla);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1]);

            var options = {
                title: "Stolen bikes found",
                width: 600,
                height: 400,
                bar: { groupWidth: "95%" },
                legend: { position: "none" },
            };
            var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
            chart.draw(view, options);
        }

    })
}]);
