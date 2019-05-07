/* global angular */
var app = angular.module("PostmanApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "ListCtrl",
            templateUrl: "list.html"
        })
         .when("/v1/computer-attacks-stats", {
            controller: "ListCtrl",
            templateUrl: "list.html"
        })
});
console.log("Modular App Initialized");
