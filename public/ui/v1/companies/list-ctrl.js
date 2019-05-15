/* global angular location*/
angular.module("PostmanApp").controller("ListCtrlCompanies", ["$scope", "$http", function($scope, $http) {
    console.log("Modular ListCtrlCompanies initialized");
    $scope.url = "/api/v1/companies";
    $scope.offset = 0;
    $scope.limit = 10;
    $scope.datos = 0;
    refresh();
    numDatos();

    function numDatos() {
        $http.get($scope.url).then(function(response) {
            $scope.datos = response.data.length;
        });
    }

    function refresh() {
        $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.companies = response.data;
            $scope.status = response.status;
            numDatos();
        }, function(response) {
            $scope.companies = response.companies || 'Request failed';
            $scope.status = response.status;
        });
    }

    function refreshFilters(countrySearch, from, to, mincom, maxcom, minsec, maxsec, minpag, maxpag) {
        $http.get($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset + from + to + mincom + maxcom + minsec + maxsec + minpag + maxpag).then(function(response) {
            $scope.companies = response.data;
            $scope.status = response.status;
            numDatos();
        }, function(response) {
            $scope.companies = response.companies || 'Request failed';
            $scope.status = response.status;
        });
    }
    $scope.alerts = [];

    function anadirAlerta() {
        if ($scope.status == 200) {
            $scope.alerts = [];
            console.log("Alerta correcta añadida");
            $scope.alerts.push({
                msg: '¡Acción realizada correctamente!'
            });
        }
        if ($scope.status == 201) {
            $scope.alerts = [];
            console.log("Alerta correcta añadida");
            $scope.alerts.push({
                msg: '¡Se ha creado un nuevo dato correctamente!'
            });
        }
        if ($scope.status == 404) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({
                msg: 'Error 404: No se ha podido encontrar el recurso'
            });
        }
        if ($scope.status == 409) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({
                msg: 'Error 409: Ha habido conflicto en su operación'
            });
        }
        if ($scope.status == 405) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({
                msg: 'Error 405: Ha realizado una creación errónea'
            });
        }
        if ($scope.status == 400) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({
                msg: 'Error 400: Ha realizado una solicitud errónea'
            });
        }
    }
    $scope.clearInput = function() {
        console.log("Reseteamos");
        document.getElementById('country').value = '';
        document.getElementById('year').value = '';
        document.getElementById('numberOfCompanies').value = '';
        document.getElementById('sector').value = '';
        document.getElementById('page').value = '';
    }
    $scope.avanzar = function() {
        $scope.offset = $scope.offset + $scope.limit;
        refresh();
    }
    $scope.retroceder = function() {
        $scope.offset = $scope.offset - $scope.limit;
        refresh();
    }
    $scope.getFilters = function(countrySearch, from, to, mincom, maxcom, minsec, maxsec, minpag, maxpag) {
        //country
        if (countrySearch == "" || countrySearch == undefined) {
            countrySearch = ""
        }
        else {
            countrySearch = "/" + countrySearch
        }
        //year
        if (from == "" || from == undefined) {
            from = "&from=0"
        }
        else {
            from = "&from=" + from
        }
        if (to == "" || to == undefined) {
            to = "&to=2000000000"
        }
        else {
            to = "&to=" + to
        }
        //numberOfCompanies
        if (mincom == "" || mincom == undefined) {
            mincom = "&mincom=0"
        }
        else {
            mincom = "&mincom=" + mincom
        }
        if (maxcom == "" || maxcom == undefined) {
            maxcom = "&maxcom=2000000000"
        }
        else {
            maxcom = "&maxcom=" + maxcom
        }
        //sector    
        if (minsec == "" || minsec == undefined) {
            minsec = "&minsec=0"
        }
        else {
            minsec = "&minsec=" + minsec
        }
        if (maxsec == "" || maxsec == undefined) {
            maxsec = "&maxsec=2000000000"
        }
        else {
            maxsec = "&maxsec=" + maxsec
        }
        //page
        if (minpag == "" || minpag == undefined) {
            minpag = "&minpag=0"
        }
        else {
            minpag = "&minpag=" + minpag
        }
        if (maxpag == "" || maxpag == undefined) {
            maxpag = "&maxpag=2000000000"
        }
        else {
            maxpag = "&maxpag=" + maxpag
        }
        console.log($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset + from + to + mincom + maxcom + minsec + maxsec + minpag + maxpag);
        $http.get($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset + from + to + mincom + maxcom + minsec + maxsec + minpag + maxpag).then(function(response) {
            console.log("Get filters done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.country = response.data.country;
            $scope.year = response.data.year;
            $scope.numberOfCompanies = response.data.numberOfCompanies;
            $scope.sector = response.data.sector;
            $scope.page = response.data.page;
            $scope.status = JSON.stringify(response.status, null, 2);
            refreshFilters(countrySearch, from, to, mincom, maxcom, minsec, maxsec, minpag, maxpag);
            anadirAlerta();
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
            if ($scope.status == 409) {
                $scope.alerts = [];
                $scope.alerts.push({
                    msg: "Error 409: No puede haber datos si quiere cargar los datos iniciales"
                })
            }
            else {
                anadirAlerta()
            }
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
            refresh();
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            if ($scope.status == 409) {
                $scope.alerts = [];
                $scope.alerts.push({
                    msg: "Error 409: Ya existe este recurso"
                })
            }
            else if ($scope.status == 400) {
                $scope.alerts = [];
                $scope.alerts.push({
                    msg: "Error 400: Datos insuficientes o erróneos"
                })
            }
            else {
                anadirAlerta()
            }
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
            if ($scope.status == 400) {
                $scope.alerts = [];
                $scope.alerts.push({
                    msg: "Error 400: Datos insuficientes"
                })
            }
            else {
                anadirAlerta()
            }
        });
    }
}]);
