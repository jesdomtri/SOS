/*global angular ,RGraph*/
angular.module("PostmanApp").controller("C3", ["$scope", "$http", "$httpParamSerializer", 
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
   
   new RGraph.SVG.Gauge({
        id: 'container3',
        innerMin:0,
        innerMax:100,
        outerMin:0,
        outerMax:50,
        value: 78,
        options: {
            adjustable: true,
            labelsIngraphUnitsPost: '%',
            labelsIngraphSize: '16',
            labelsIngraphBold: true,
            centerpinRadius: 10,
            labelsIngraphDecimals: 1
        }
    }).draw();
    
 
    });
}]);