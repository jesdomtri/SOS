/*global angular $scope*/
var app = angular.module("PostmanApp");
console.log("Modular App Initialized");

    app.controller("MainController",["$scope","$http", function ($scope,$http) {
        
        console.log("MainController initialized");
        
        $scope.url= "/api/v1/computers-attacks-stats";
        
        $scope.get = function(){
            $http.get($scope.url).then( function(response){
                $scope.data=JSON.stringify(response.data,null,2);
                $scope.status = JSON.stringify(response.status,null,2);
            }
                );
        };
        
        $scope.delete = function(){
            $http.delete($scope.url).then(function(response){
                $scope.data = JSON.stringify(response.data,null,2);
                $scope.status=JSON.stringify(response.stats,null,2);
                
            });
        };
        
        
        
        
        
        
    }]);