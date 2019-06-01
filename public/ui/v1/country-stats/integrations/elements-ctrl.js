/*global angular, Highcharts, Chartist, RGraph*/

angular.module("PostmanApp").
controller("elementsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //HIGHCHARTS
    $http.get("https://sos1819-14.herokuapp.com/api/v1/elements").then(function(response) {
        
        var nameApi = response.data.map(function(d) { return d.province });
        var valuesApi = response.data.map(function(d) { return d.victims });

        new RGraph.SVG.Radar({
            id: 'chart-container',
            data: [valuesApi
            ],
            options: {
                backgroundGrid: false,
                colors: ['red', 'black'],
                tickmarksStyle: null,
                linewidth: 3,
                labels: nameApi
            }
        }).draw();
    })
}]);
