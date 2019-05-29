/* global angular */
var app = angular.module("PostmanApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html"
        })
        .when("/about", {
            templateUrl: "about.html"
        })
        .when("/analytics", {
            templateUrl: "analytics.html"
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
        .when("/analytics/numberOfCompanies", {
            controller: "numberOfCompaniesCtrl",
            templateUrl: "/ui/v1/companies/analytics/numberOfCompanies.html"
        })
        .when("/integrations/UefaCountryRankings", {
            controller: "uefaCountryRankingsCtrl",
            templateUrl: "/ui/v1/companies/integrations/uefaCountryRankings.html"
        })
        .when("/integrations/BeerConsumedStats", {
            controller: "beerConsumedStatsCtrl",
            templateUrl: "/ui/v1/companies/integrations/beerConsumedStats.html"
        })
        .when("/integrations/restCountries", {
            controller: "restCountriesCtrl",
            templateUrl: "/ui/v1/companies/integrations/restCountries.html"
        })
        .when("/integrations/chuckNorris", {
            controller: "chuckNorrisCtrl",
            templateUrl: "/ui/v1/companies/integrations/chucknorris.html"
        })
        .when("/integrations/universities", {
            controller: "universitiesCtrl",
            templateUrl: "/ui/v1/companies/integrations/universities.html"
        })
        .when("/integrations/mattermark", {
            controller: "mattermarkCtrl",
            templateUrl: "/ui/v1/companies/integrations/mattermark.html"
        })
        .when("/ui/v1/country-stats", {
            controller: "ListCtrlStats",
            templateUrl: "/ui/v1/country-stats/list.html"
        })
        .when("/ui/v1/country-stats/update/:country/:year", {
            controller: "UpdateCtrlStats",
            templateUrl: "/ui/v1/country-stats/update.html"
        })
        .when("/analytics/populationGrowth20132017", {
            controller: "AnalyticsCtrlStats",
            templateUrl: "/ui/v1/country-stats/analytics/analytics.html"
        })
        .when("/integrations/UefaClubRankings", {
            controller: "uefaClubRankingsCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/uefaClubRankings.html"
        })
        .when("/integrations/Hurricanes", {
            controller: "hurricanesCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/hurricanes.html"
        })
         .when("/integrations/Tvmaze", {
            controller: "tvmazeCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/tvmaze.html"
        })
        .when("/integrations/Numbers", {
            controller: "numbersCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/numbers.html"
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
