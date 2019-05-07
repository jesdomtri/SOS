/* global angular */
var app = angular.module("PostmanApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "index.html"
        })
        .when("/ui/v1/companies/", {
            controller: "ListCtrl",
            templateUrl: "/ui/v1/companies/list.html"
        })
});
console.log("Modular App Initialized");
