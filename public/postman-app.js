/* global angular */
var app = angular.module("PostmanApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "index.html"
        })
        .when("/companies", {
            controller: "ListCtrl",
            templateUrl: "list.html"
        })
        .when("/country-stats", {
            controller: "ListCtrl",
            templateUrl: "list.html"
        })
});
console.log("Modular App Initialized");
