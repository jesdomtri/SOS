/*global angular, Highcharts, unirest, Chartist*/

angular.module("PostmanApp").
controller("movieStatsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("https://sos1819-02.herokuapp.com/api/v1/movies-stats").then(function(response) {
        
        var movieName = [];
        var movieAwards = [];
        
        for (var i = 0; i < response.data.length; i++){
            movieName.push(response.data[i].name);
            movieAwards.push(response.data[i].movieaward);
        }
        
        console.log(movieName);
        console.log(movieAwards);

        new Chartist.Line('.ct-chart', {
            labels: movieName,
            series: [movieAwards]
        }, {
            fullWidth: true,
            chartPadding: {
                right: 40
            }
        });
    });

}]);
