/* global angular */
var app = angular.module("PostmanApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
    	.when("/", {
            templateUrl: "home.html"
        })
        .when("/ui/v1/companies", {
            controller: "ListCtrlCompanies",
            templateUrl: "/ui/v1/companies/list.html"
        })
        .when("/ui/v1/companies/update/:country/:year", {
            controller: "UpdateCtrlCompanies",
            templateUrl: "/ui/v1/companies/update.html"
        })
        .when("/ui/v1/country-stats", {
            controller: "ListCtrlStats",
            templateUrl: "/ui/v1/country-stats/list.html"
        })
        .when("/ui/v1/country-stats/update/:country/:year", {
            controller: "UpdateCtrlStats",
            templateUrl: "/ui/v1/country-stats/update.html"
        })
        .when("/ui/v1/computer-attacks-stats", {
            controller: "ListCtrlAttacks",
            templateUrl: "/ui/v1/computer-attacks-stats/list.html"
        })
        .when("/ui/v1/computer-attacks-stats/update/:country/:year", {
            controller: "UpdateCtrlAttacks",
            templateUrl: "/ui/v1/computer-attacks-stats/update.html"
        });
});
console.log("Modular App Initialized");
