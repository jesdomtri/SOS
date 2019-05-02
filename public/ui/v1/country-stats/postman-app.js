/* global angular */

    angular.module("PostmanApp",["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                   controller : "ListCtrl",
                   templateUrl: "list.html"
                });
        });

    console.log("Postman App Initialized.");