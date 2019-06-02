/*global angular,Highcharts*/

angular.module("PostmanApp").
controller("C1", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiH = "/proxyHappiness";

     $http.get(apiH).then(function(response) {
        
        var paises = response.data.map(function(d) { return d.country });
        console.log(paises);
        var happinessScoreApi = response.data.map(function(d) { return d.happinessScore });
        console.log(happinessScoreApi);
        var variables = [];
       
            
            for (var i = 0; i < paises.length; i++) {
            
                variables.push({name: paises[i], data: happinessScoreApi[i]});
               
        }
       console.log(variables);
  Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Happiness Stats',
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
        name: 'Money ',
        innerSize: '50%',
        data: variables
    }]
});
      
      
            
            
            
        
     });
}]);