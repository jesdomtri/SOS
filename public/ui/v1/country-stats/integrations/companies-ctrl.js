/*global angular, Highcharts, Chartist, RGraph*/

angular.module("PostmanApp").
controller("companiesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //HIGHCHARTS
    $http.get("https://sos1819-03.herokuapp.com/api/v1/companies").then(function(response) {
        
        var filteredcountry = [];
        var filteredsector = [];

        var nameApi = response.data.map(function(d) { return d.country });
        var yearApi = response.data.map(function(d) { return d.year });
        var sectorApi = response.data.map(function(d) { return d.sector });

        for (var i = 0; i < nameApi.length; i++) {
            if (yearApi[i] == 2017) {
                filteredcountry.push(nameApi[i]);
                filteredsector.push(sectorApi[i]);
            }
        }
        
        console.log(filteredcountry);
        console.log(filteredsector);

        new RGraph.SVG.Rose({
            id: 'chart-container',
            data: filteredsector,
            options: {
                colors: ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)'],
                backgroundGridRadialsCount: 0,
                linewidth: 2,
                amargin: '5deg',
                labels: filteredcountry,
                tooltips: filteredcountry,
                linewidth: .5
            }
        }).draw();
    })
}]);
