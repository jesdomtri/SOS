/*global angular, Highcharts ,RGraph*/
angular.module("PostmanApp").
controller("C3", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
   
     var apiH = "/proxyCompanies";
   
    $http.get(apiH)
    .then(function(response) {

        var valores = [];
        var paises = []; 
        
        
        var companyAPI = response.data.map(function(d) { return d.company });
        
        var employeePI = response.data.map(function(d) { return d.employee });
        
        for (var i = 0; i < companyAPI.length; i++) {
            
                 paises.push(companyAPI[i]);
                 valores.push(employeePI[i]);
            
        }
       console.log(valores);
       console.log(paises);
  
   var g = new RGraph.SVG.Rose({
        id: 'container3',
        data: valores,
        options: {
            colors: [ 'red', 'black' ],
            backgroundGridRadialsCount: 1,
            linewidth: 2,
            amargin: '5deg',
            labels: paises,
            linewidth: .3
        }
    }).draw();
 
    });
}]);