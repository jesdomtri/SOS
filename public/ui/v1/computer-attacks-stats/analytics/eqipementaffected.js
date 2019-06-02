/*global angular,Highcharts,google*/


 


angular.module("PostmanApp").
controller("AnalyticsCtrlAttack", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
  console.log("CTRATTACKS");
 
    var BASE_API_PATH ="/api/v1/computers-attacks-stats";
    
      $http.get(BASE_API_PATH).then(function(response) {
        console.log("Creando la gráfica Highchart");

         var variables = [];

       var paises = response.data.map(function(d) { return d.country});
            var años = response.data.map(function(d) { return d.year });
            var affected = response.data.map(function(d) { return d.affectedequipments });

            for (var i = 0; i < paises.length; i++) {
                if (años[i] == 2017) {
                    variables.push([paises[i], affected[i]]);
                }
            
        }
              
          
  Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Equipos <br>afectados<br>2017',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Afectados',
        innerSize: '50%',
        data: variables
    }]
});
      
   
             
                
});


$http.get(BASE_API_PATH).then(function(response) {
        google.charts.load('current', { 'packages': ['geochart'] });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var variables = [];
            variables.push(['Country', ' Equipos afectados (2017)']);

            var paises = response.data.map(function(d) { return d.country});
            var años = response.data.map(function(d) { return d.year });
            var affected = response.data.map(function(d) { return d.affectedequipments });

            for (var i = 0; i < paises.length; i++) {
                if (años[i] == 2017) {
                    variables.push([paises[i], affected[i]]);
                }
            }
            
            console.log(variables);

            var data = google.visualization.arrayToDataTable(variables);
            var options = {};
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            chart.draw(data, options);
        }
    })
      
     var Plotly = require('plotly')('joaquin94','sos1819-03'); 

     $http.get(BASE_API_PATH).then(function(response) {
 
        console.log("Creando la gráfica Highchart");

         var variablesP = [];
         var variablesN=[]
     
            var paises = response.data.map(function(d) { return d.country});
            var años = response.data.map(function(d) { return d.year });
            var affected = response.data.map(function(d) { return d.affectedequipments });

            for (var i = 0; i < paises.length; i++) {
                if (años[i] == 2017) {
                    variablesP.push([paises[i]]);
                    variablesN.push(([affected[i]]));
                }
            
        }
         var lineDiv = document.getElementById('plotly');
 
         var traceA = {
         x: variablesP,
         y: variablesN,
          type: 'scatter'
        };

        var data = [traceA];
 
         var layout = {
      title:'A Line Chart in Plotly'
       };
 
       Plotly.newPlot( lineDiv, data, layout );

     });
    

}]);