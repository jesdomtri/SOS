/* global angular location*/
var app = angular.module("PostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Modular MainCtrl initialized");
    $scope.url = "/api/v1/companies";
    refresh();

    function refresh() {
        $http.get($scope.url).then(function(response) {
            $scope.companies = response.data;
            $scope.status = response.status;

        }, function(response) {
            $scope.companies = response.companies || 'Request failed';
            $scope.status = response.status;
        });
    }

    function refreshpage() {
        location.reload();
    }
    $scope.get = function() {
        $http.get($scope.url).then(function(response) {
            console.log("Get done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.country = response.data.country;
            $scope.year = response.data.year;
            $scope.numberOfCompanies = response.data.numberOfCompanies;
            $scope.sector = response.data.sector;
            $scope.page = response.data.page;
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.loadinitial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            console.log("Load initial data done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.del = function() {
        $http.delete($scope.url).then(function(response) {
            console.log("Everything is clean here");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.delTable = function(country, year) {
        $http.delete($scope.url + "/" + country + "/" + year).then(function(response) {
            console.log("Delete one done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.post = function() {
        $http.post($scope.url, {
            country: $scope.country,
            year: parseInt($scope.year),
            numberOfCompanies: parseInt($scope.numberOfCompanies),
            sector: parseInt($scope.sector),
            page: parseInt($scope.page)
        }).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.postTable = function(country, year, numberOfCompanies, sector, page) {
        $http.post($scope.url, {
            country: country,
            year: parseInt(year),
            numberOfCompanies: parseInt(numberOfCompanies),
            sector: parseInt(sector),
            page: parseInt(page)
        }).then(function(response) {
            console.log("Post table done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refreshpage()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.postJSON = function() {
        $http.post($scope.url, $scope.data).then(function(response) {
            $scope.data = "";
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.put = function() {
        $http.put($scope.url, {
            country: $scope.country,
            year: parseInt($scope.year),
            numberOfCompanies: parseInt($scope.numberOfCompanies),
            sector: parseInt($scope.sector),
            page: parseInt($scope.page)
        }).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.putTable = function(country, year, numberOfCompanies, sector, page) {
        $http.put($scope.url + "/" + country + "/" + year, {
            country: country,
            year: parseInt(year),
            numberOfCompanies: parseInt(numberOfCompanies),
            sector: parseInt(sector),
            page: parseInt(page)
        }).then(function(response) {
            console.log("Put table done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.putJSON = function() {
        $http.put($scope.url, $scope.data).then(function(response) {
            $scope.data = "";
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    }
}]);
