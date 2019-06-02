/*global angular ,RGraph*/
angular.module("PostmanApp").controller("C3", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
   
     var apiH = "/proxyCompanies";
   
    $http.get(apiH)
    .then(function(response) {

        
        var valor  = 5000000; 
        var total = 0; 
        var employeeAPI = response.data.map(function(d) { return d.employee });
        console.log(employeeAPI);
        for (var i = 0; i < employeeAPI.length; i++) {
            total = total + employeeAPI[i];
          }
      total =  (total/valor) *100;
   console.log(total);
   new RGraph.SVG.Gauge({
        id: 'container3',
        innerMin:0,
        innerMax:100,
        outerMin:0,
        outerMax:50,
        value: total,
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