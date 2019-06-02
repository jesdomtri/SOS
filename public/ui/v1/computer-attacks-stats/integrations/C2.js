/*global angular, Highcharts*/
angular.module("PostmanApp").
controller("C2", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
     var apiH = "/proxyTransfer";
    $http.get(apiH)
    .then(function(response) {

        var valores = [];
        
        
        var teamAPI = response.data.map(function(d) { return d.team });
        
        var moneyPI = response.data.map(function(d) { return d.moneyspent });
        
        for (var i = 0; i < teamAPI.length; i++) {
            
               valores.push([teamAPI[i],moneyPI[i]]);
                
            
        }
       console.log(valores);
  
 
        Highcharts.chart('container2', {
     chart: {
        type: 'column'
    },
    title: {
        text: 'World\'s largest cities per 2017'
    },
    subtitle: {
        text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Transfers stats (millions)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Money: <b> millions</b>'
    },
    series: [{
        name: 'Transfer stats',
        data: valores
        ,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
        }); 
        
    });
}]);