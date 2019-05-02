/* global angular */
var app = angular.module("PostmanApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "ListCtrl",
            templateUrl: "list.html"
        })
});
console.log("Modular App Initialized");
