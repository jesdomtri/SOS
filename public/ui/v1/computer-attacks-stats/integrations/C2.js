/*global angular, Highcharts*/
angular.module("PostmanApp").
controller("C2", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
     var apiH = "/proxyTransfer";
    $http.get(apiH)
    .then(function(response) {

        var valores = [];
        var valores2=[];
        
        var teamAPI = response.data.map(function(d) { return d.team });
        
        var moneyPI = response.data.map(function(d) { return d.moneyspent });
        
        for (var i = 0; i < teamAPI.length; i++) {
            
               valores.push(teamAPI[i]);
                valores2.push(moneyPI[i]);
            
        }
       console.log(valores);
  
 
      Highcharts.chart('container2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Transfers in Millions'
    },
    xAxis: {
        categories: valores
    },
    yAxis: {
        min: 0,
        title: {
            text: ' Millions'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'Transfer',
        data: valores2
    }]
});
        
    });
}]);