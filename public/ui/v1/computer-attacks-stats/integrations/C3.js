/*global angular ,RGraph*/
angular.module("PostmanApp").controller("C3", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
   
     var apiH = "/proxyCompanies";
   
    $http.get(apiH)
    .then(function(response) {

        var suma = [];
       
        
        var employeeAPI = response.data.map(function(d) { return d.employee });
        
        for (var i = 0; i < employeeAPI.length; i++) {
            suma = suma + employeeAPI[i];
               
        }
     
   
   new RGraph.SVG.Gauge({
        id: 'container3',
        innerMin:0,
        innerMax:100,
        outerMin:0,
        outerMax:50,
        value: suma,
        options: {
            adjustable: true,
            labelsIngraphUnitsPost: '2%',
            labelsIngraphSize: '16',
            labelsIngraphBold: true,
            centerpinRadius: 10,
            labelsIngraphDecimals: 1
        }
    }).draw();
    
 
    });
}]);