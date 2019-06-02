/*global angular, RGraph*/

angular.module("PostmanApp").controller("C4", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
   
   
   $http.get("https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture")
    .then(function(response) {

        
        var valores = [];
        
        
        var paisAPI = response.data.map(function(d) { return d.expensePerCapita});
        
        var moneyPI = response.data.map(function(d) { return d.budgetPercentage });
        
        for (var i = 0; i < paisAPI.length; i++) {
            
               valores.push([{x: paisAPI[i], y: moneyPI[i]}]);
                
            
        }
       console.log(valores);
    var data = valores;

    var scatter = new RGraph.SVG.Scatter({
        id: 'container4',
        data: data,
        options: {
            xaxisScale: true,
            xaxisScaleUnitsPost: '€',
            xaxisScaleMin:0,
            xaxisScaleMax: 100,
            yaxis: false,
            backgroundGridVlines: false,
            backgroundGridBorder: false
        }
    }).draw();
    })
    }]);