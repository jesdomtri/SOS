/*global angular,Highcharts,google*/

angular.module("PostmanApp").
controller("C1", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiH = "/proxyHappiness";

     $http.get(apiH).then(function(response) {
        
        var paises = response.data.map(function(d) { return d.country });
        var happinessScoreApi = response.data.map(function(d) { return d.happinessScore });
        
        var variables = [];
       
            
            for (var i = 0; i < paises.length; i++) {
            
                variables.push(paises[i],happinessScoreApi[i]);
               
            
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
}]);