/*global angular, RGraph, google,Plotly*/

angular.module("PostmanApp").controller("C6", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
   
   
   $http.get("https://sos1819-01.herokuapp.com/api/v1/major-disasters")
    .then(function(response) {
         
         var variablesP =[];
         var variablesN=[]
      
        var eventAPI = response.data.map(function(d) { return d.event });
        var inflationAPI = response.data.map(function(d) { return d.inflation});
        
       for (var i = 0; i < eventAPI.length; i++) {
                    variablesP.push(eventAPI[i]);
                    variablesN.push(inflationAPI[i]);
                }
         $http.get("/api/v1/computers-attacks-stats").then(function(response) {

            var tablaPaises = [];
            var tablaAFE = [];

            var paises = response.data.map(function(d) { return d.country });
            var años = response.data.map(function(d) { return d.year });
            var affectedequipmentsAPI = response.data.map(function(d) { return d.affectedequipments });
             
             for (var i = 0; i < paises.length; i++) {
                if (años[i] == 2017) {
                    tablaPaises.push(eventAPI[i]);
                    tablaAFE.push(affectedequipmentsAPI[i]);
                }
                 
             }
             
              var trace1 = {
              x: variablesP,
              y: variablesN,
              type: 'scatter'
            };
                var trace2 = {
              x: tablaPaises,
              y: tablaAFE,
              type: 'scatter'
            };


            var data = [trace1,trace2];
            
            Plotly.newPlot('plotly2', data);
             })  
    })
    }]);