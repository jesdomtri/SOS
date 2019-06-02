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
        .when("/analytics/grupal", {
            controller: "grupalCtrl",
            templateUrl: "grupal.html"
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
        .when("/integrations/Scorers", {
            controller: "scorersCtrl",
            templateUrl: "/ui/v1/companies/integrations/scorers.html"
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
        .when("/integrations/breakingNews", {
            controller: "breakingNewsCtrl",
            templateUrl: "/ui/v1/companies/integrations/breakingNews.html"
        })
        .when("/integrations/carbonIntensity", {
            controller: "carbonIntensityCtrl",
            templateUrl: "/ui/v1/companies/integrations/carbonIntensity.html"
        })
        .when("/integrations/youthUnemploymentStats", {
            controller: "unemploymentCtrl",
            templateUrl: "/ui/v1/companies/integrations/unemployment.html"
        })
        .when("/integrations/hearthstone", {
            controller: "hearthstoneCtrl",
            templateUrl: "/ui/v1/companies/integrations/hearthstone.html"
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
        .when("/integrations/MovieStats", {
            controller: "movieStatsCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/movieStats.html"
        })
        .when("/integrations/Elements", {
            controller: "elementsCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/elements.html"
        })
        .when("/integrations/Companies", {
            controller: "companiesCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/companies.html"
        })
         .when("/integrations/Faroo", {
            controller: "farooCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/faroo.html"
        })
         .when("/integrations/TVMaze", {
            controller: "tvmazeCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/tvmaze.html"
        })
        .when("/integrations/CheckThatBike", {
            controller: "stolenbikeCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/stolenbike.html"
        })
        .when("/integrations/JailBase", {
            controller: "jailBaseCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/jailbase.html"
        })
        .when("/integrations/Hedonometer", {
            controller: "hedonometerCtrl",
            templateUrl: "/ui/v1/country-stats/integrations/hedonometer.html"
        })
        .when("/ui/v1/computer-attacks-stats", {
            controller: "ListCtrlAttacks",
            templateUrl: "/ui/v1/computer-attacks-stats/list.html"
        })
        .when("/ui/v1/computer-attacks-stats/update/:country/:year/:attacktype", {
            controller: "UpdateCtrlAttacks",
            templateUrl: "/ui/v1/computer-attacks-stats/update.html"
        })
        .when("/analytics/equipmentaffected", {
            controller: "AnalyticsCtrlAttack",
            templateUrl: "/ui/v1/computer-attacks-stats/analytics/equipementaffected.html"
        })
        .when("/integrations/happinessStats", {
            controller: "C1",
            templateUrl: "/ui/v1/computer-attacks-stats/integrations/happiness-stats.html"
        })
        .when("/integrations/transferStats", {
            controller: "C2",
            templateUrl: "/ui/v1/computer-attacks-stats/integrations/transfer-stats.html"
        })
        .when("/integrations/companiesStasts", {
            controller: "C3",
            templateUrl: "/ui/v1/computer-attacks-stats/integrations/companies-stasts.html"
        });
});
