/*global angular, Highcharts*/
angular.module("PostmanApp").
controller("C2", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {

    $http.get("https://sos1819-06.herokuapp.com/api/v1/transfer-stats")
    .then(function(response) {

        var equipos = [];
        var moneyspentAPI = [];
        
        var teamAPI = response.data.map(function(d) { return d.team });
        var moneyPI = response.data.map(function(d) { return d.moneyspent });
        
        for (var i = 0; i < teamAPI.length; i++) {
            
                equipos.push(teamAPI[i]);
                moneyspentAPI.push(moneyPI[i]);
            
        }

        Highcharts.chart('container', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Mercado de fichages'
    },
    subtitle: {
        text: 'API SOURCE : transfer-stats'
    },
    xAxis: [{
        categories: equipos,
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        
        title: {
            text: 'Dinero',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
    },
    series: [{
        name: 'Money',
        type: 'spline',
        yAxis: 1,
        data: moneyspentAPI,
        tooltip: {
            valueSuffix: ' mm'
        }

    
    }]
        
        }); 
        
    });
}]);