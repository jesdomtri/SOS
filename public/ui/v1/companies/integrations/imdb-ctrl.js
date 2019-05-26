/*global angular, unirest*/

angular.module("PostmanApp").
controller("imdbCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    unirest.get("https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=Avengers+Endgame")
        .header("X-RapidAPI-Host", "movie-database-imdb-alternative.p.rapidapi.com")
        .header("X-RapidAPI-Key", "0b4ef1175emsh16a660bcab25a09p1bfde3jsn267c22bc6ddc")
        .end(function(result) {
            $scope.data = JSON.stringify(result.body, null, 2);
            $scope.status = result.status;
            console.log(result.status, result.headers, result.body);
        });

}]);
