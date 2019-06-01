/*global angular,Highcharts,google*/

angular.module("PostmanApp").
controller("AnalyticsCtrlAttack", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
  
 
    var BASE_API_PATH ="api/v1/computer-attacks-stats";
    
      $http.get(BASE_API_PATH).then(function(response) {
        console.log("Creando la gráfica Highchart");

         var valores = [];

        var arrCountry = response.data.map(function(a) { return a.country });
        var años =    response.data.map(function(d) { return d.year });
        var affected =   response.data.map(function(b) { return b.affectedequipments });
      

        for (var i = 0; i < arrCountry.length; i++) {
            if (años[i] == 2017) {
               
                valores.push({ name: arrCountry[i], number: affected[i], drilldown: arrCountry[i] });
            }
        }
              
          
  Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Equipos r<br>afectados<br>2017',
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
        name: 'Browser share',
        innerSize: '50%',
        data: valores
    }]
});
      
   
             
                
});

    
}]);