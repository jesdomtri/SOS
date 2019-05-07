/* global angular */
var app = angular.module("PostmanApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "ListCtrl",
            templateUrl: "list.html"
        })
        .when("/update/:country/:year", {
            controller: "UpdateCtrl",
            templateUrl: "update.html"
        })
});
console.log("Modular App Initialized");
