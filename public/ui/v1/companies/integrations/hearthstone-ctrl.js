/*global angular, Highcharts*/

angular.module("PostmanApp").
controller("hearthstoneCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    refresh();

    function refresh() {
        var config = {
            headers: {
                "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "0b4ef1175emsh16a660bcab25a09p1bfde3jsn267c22bc6ddc"
            }
        };
        $http.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/info", config).then(function(response) {
            $scope.datos = response.data;
            $scope.status = response.status;
            console.log($scope.datos);
        });
    }

}]);
