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
   
   /*new RGraph.SVG.Rose({
        id: 'chart-container',
        data: valores,
        options: {
            colors: [ 'rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)' ],
            backgroundGridRadialsCount: 0,
            linewidth: 2,
            amargin: '5deg',
            labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            tooltips: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            linewidth: .5
        }
    }).draw();*/
     new RGraph.SVG.Gauge({
        id: 'chart-container',
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