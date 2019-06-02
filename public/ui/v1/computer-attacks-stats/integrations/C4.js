/*global angular, RGraph*/

angular.module("PostmanApp").controller("C3", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
   
   
   $http.get("https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture")
    .then(function(response) {

        
        var valores = [];
        
        
        var teamAPI = response.data.map(function(d) { return d.team });
        
        var moneyPI = response.data.map(function(d) { return d.moneyspent });
        
        for (var i = 0; i < teamAPI.length; i++) {
            
               valores.push([{x:teamAPI[i], y:moneyPI[i]}]);
                
            
        }
       console.log(valores);
    var data = valores;

    var scatter = new RGraph.SVG.Scatter({
        id: 'container4',
        data: data,
        options: {
            xaxisScale: true,
            xaxisScaleUnitsPost: 'Kg',
            xaxisScaleMin:100,
            xaxisScaleMax: 200,
            yaxis: false,
            backgroundGridVlines: false,
            backgroundGridBorder: false
        }
    }).draw();
    })
    }]);