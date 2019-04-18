/* global angular location*/
var app = angular.module("PostmanApp");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Modular MainCtrl initialized");
    $scope.url = "/api/v1/companies";
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];
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

    function resfreshCountry(country) {
        $http.get($scope.url + "/" + country).then(function(response) {
            $scope.companies = response.data;
            $scope.status = response.status;

        }, function(response) {
            $scope.companies = response.companies || 'Request failed';
            $scope.status = response.status;
        });
    }


    function refreshFromTo(from, to) {
        $http.get($scope.url + "?from=" + from + "&to=" + to).then(function(response) {
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

    $scope.setPage = function(index) {
        $scope.currentPage = index - 1;
    };

    $scope.alerts = [];

    function anadirAlerta(country) {
        if ($scope.status == 200) {
            $scope.alerts = [];
            console.log("Alerta correcta añadida");
            $scope.alerts.push({ msg: '¡Acción realizada correctamente!' });
        }
        if ($scope.status == 201) {
            $scope.alerts = [];
            console.log("Alerta correcta añadida");
            $scope.alerts.push({ msg: '¡Se ha creado un nuevo dato correctamente!' });
        }
        if ($scope.status == 404) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({ msg: 'Error 404: No se ha podido encontrar el recurso' });
        }
        if ($scope.status == 409) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({ msg: 'Error 409: Ha habido conflicto en su operación' });
        }
        if ($scope.status == 405) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({ msg: 'Error 405: Ha realizado una creación errónea' });
        }
        if ($scope.status == 400) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({ msg: 'Error 400: Ha realizado una solicitud errónea' });
        }
    }

    function anadirAlertaCountry(country){
        if ($scope.status == 404) {
            $scope.alerts = [];
            console.log("Alerta mala añadida de country");
            $scope.alerts.push({ msg: 'Error 404: No se ha podido encontrar el recurso '  + country});
        }
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
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
        });
    }
    $scope.getCountry = function(country) {
        $http.get($scope.url + "/" + country).then(function(response) {
            console.log("Get done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.country = response.data.country;
            $scope.year = response.data.year;
            $scope.numberOfCompanies = response.data.numberOfCompanies;
            $scope.sector = response.data.sector;
            $scope.page = response.data.page;
            $scope.status = JSON.stringify(response.status, null, 2);
            resfreshCountry(country);
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlertaCountry(country);
        });
    }
    $scope.getFromTo = function(from, to) {
        $http.get($scope.url + "?from=" + from + "&to=" + to).then(function(response) {
            console.log("Get done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.country = response.data.country;
            $scope.year = response.data.year;
            $scope.numberOfCompanies = response.data.numberOfCompanies;
            $scope.sector = response.data.sector;
            $scope.page = response.data.page;
            $scope.status = JSON.stringify(response.status, null, 2);
            refreshFromTo(from, to);
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
        });
    }
    $scope.loadinitial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            console.log("Load initial data done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
        });
    }
    $scope.del = function() {
        $http.delete($scope.url).then(function(response) {
            console.log("Everything is clean here");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
        });
    }
    $scope.delTable = function(country, year) {
        $http.delete($scope.url + "/" + country + "/" + year).then(function(response) {
            console.log("Delete one done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
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
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
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
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
        });
    }
    $scope.postJSON = function() {
        $http.post($scope.url, $scope.data).then(function(response) {
            $scope.data = "";
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
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
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
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
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
        });
    }
    $scope.putJSON = function() {
        $http.put($scope.url, $scope.data).then(function(response) {
            $scope.data = "";
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta()
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta()
        });
    }
}]).filter("startFrom", function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});