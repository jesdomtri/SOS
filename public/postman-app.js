/* global angular */
var app = angular.module("PostmanApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html"
        })
        .when("/about", {
            templateUrl: "about.html"
        })
        .when("/integrations", {
            templateUrl: "integrations.html"
        })
        .when("/ui/v1/companies", {
            controller: "ListCtrlCompanies",
            templateUrl: "/ui/v1/companies/list.html"
        })
        .when("/ui/v1/companies/update/:country/:year", {
            controller: "UpdateCtrlCompanies",
            templateUrl: "/ui/v1/companies/update.html"
        })
        .when("/integrations/numberOfCompanies", {
            controller: "numberOfCompaniesCtrl",
            templateUrl: "/ui/v1/companies/integrations/numberOfCompanies.html"
        })
        .when("/ui/v1/country-stats", {
            controller: "ListCtrlStats",
            templateUrl: "/ui/v1/country-stats/list.html"
        })
        .when("/ui/v1/country-stats/update/:country/:year", {
            controller: "UpdateCtrlStats",
            templateUrl: "/ui/v1/country-stats/update.html"
        })
        .when("/integrations/populationGrowth20132017", {
            controller: "IntegrationCtrlStats",
            templateUrl: "/ui/v1/country-stats/integrations/integration.html"
        })
        .when("/ui/v1/computer-attacks-stats", {
            controller: "ListCtrlAttacks",
            templateUrl: "/ui/v1/computer-attacks-stats/list.html"
        })
        .when("/ui/v1/computer-attacks-stats/update/:country/:year/:attacktype", {
            controller: "UpdateCtrlAttacks",
            templateUrl: "/ui/v1/computer-attacks-stats/update.html"
        });
});
console.log("Modular App Initialized");
