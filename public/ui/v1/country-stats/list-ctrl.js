/* global angular */
console.log("Prueba 1");
angular.module("PostmanApp")
    .controller("ListCtrlStats", ["$scope", "$http", "$location", function($scope, $http, $location) {
        console.log("List Controller Stats initialized.");

        $scope.url = "/api/v1/country-stats";
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
        
        $scope.clearInput = function(){
        document.getElementById('country').value = '';
        document.getElementById('year').value = '';
        document.getElementById('extensionOfBorders').value = '';
        document.getElementById('population').value = '';
        document.getElementById('territorialExtension').value = '';
        }
        
        function refresh() {
            $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
                $scope.stats = response.data;
                $scope.status = response.status;
                numDatos();
                console.log("Prueba 2");

            }, function(response) {
                $scope.stats = response.stats || 'Request failed';
                $scope.status = response.status;
            });
        }
        
        function refreshFilters(countrySearch, from, to, minext, maxext, minpop, maxpop, minter, maxter) {
        $http.get($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset +
            from + to + minext + maxext + minpop + maxpop + minter + maxter).then(function(response) {
            $scope.stats = response.data;
            $scope.status = response.status;
            numDatos();

        }, function(response) {
            $scope.stats = response.stats || 'Request failed';
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
                    msg: 'Error 409: El recurso que ha intentado añadir ya existe'
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

        $scope.avanzar = function() {
            $scope.offset = $scope.offset + $scope.limit;
            refresh();
        }

        $scope.retroceder = function() {
            $scope.offset = $scope.offset - $scope.limit;
            refresh();
        }
        
        $scope.getFilters = function(countrySearch, from, to, minext, maxext, minpop, maxpop, minter, maxter) {
        //country
        if (countrySearch == "" || countrySearch == undefined) { countrySearch = "" }
        else { countrySearch = "/" + countrySearch }
        //year
        if (from == "" || from == undefined) { from = "&from=0" }
        else { from = "&from=" + from }
        if (to == "" || to == undefined) { to = "&to=2000000000" }
        else { to = "&to=" + to }
        //extensionOfBorders
        if (minext == "" || minext == undefined) { minext = "&minext=0" }
        else { minext = "&minext=" + minext }
        if (maxext == "" || maxext == undefined) { maxext = "&maxext=2000000000" }
        else { maxext = "&maxext=" + maxext }
        //population  
        if (minpop == "" || minpop == undefined) { minpop = "&minpop=0" }
        else { minpop = "&minpop=" + minpop }
        if (maxpop == "" || maxpop == undefined) { maxpop = "&maxpop=2000000000" }
        else { maxpop = "&maxpop=" + maxpop }
        //territorialExtension
        if (minter == "" || minter == undefined) { minter = "&minter=0" }
        else { minter = "&minter=" + minter }
        if (maxter == "" || maxter == undefined) { maxter = "&maxter=2000000000" }
        else { maxter = "&maxter=" + maxter }
        console.log($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset +
            from + to + minext + maxext + minpop + maxpop + minter + maxter);
        $http.get($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset +
            from + to + minext + maxext + minpop + maxpop + minter + maxter).then(function(response) {
            console.log("Get filters done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.country = response.data.country;
            $scope.year = response.data.year;
            $scope.numberOfCompanies = response.data.numberOfCompanies;
            $scope.sector = response.data.sector;
            $scope.page = response.data.page;
            $scope.status = JSON.stringify(response.status, null, 2);
            refreshFilters(countrySearch, from, to, minext, maxext, minpop, maxpop, minter, maxter);
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
                        msg: "Error 409: Ya existen datos cargados en la aplicación"
                    })
                } else {
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
        $scope.postTable = function(country, year, extensionOfBorders, population, territorialExtension) {
            $http.post($scope.url, {
                country: country,
                year: parseInt(year),
                extensionOfBorders: parseInt(extensionOfBorders),
                population: parseInt(population),
                territorialExtension: parseInt(territorialExtension)
            }).then(function(response) {
                console.log("Post table done");
                $scope.data = JSON.stringify(response.data, null, 2);
                $scope.status = JSON.stringify(response.status, null, 2);
                refresh()
                anadirAlerta()
            }, function(response) {
                $scope.data = response.data || 'Request failed';
                $scope.status = response.status;
                if ($scope.status == 409) {
                    $scope.alerts = [];
                    $scope.alerts.push({
                        msg: "Error 409: Ya existe este recurso"
                    })
                } else if ($scope.status == 400) {
                    $scope.alerts = [];
                    $scope.alerts.push({
                        msg: "Error 400: Datos insuficientes"
                    })
                } else {
                    anadirAlerta()
                }
            });
        }
        $scope.putTable = function(country, year, extensionOfBorders, population, territorialExtension) {
            $http.put($scope.url + "/" + country + "/" + year, {
                country: country,
                year: parseInt(year),
                extensionOfBorders: parseInt(extensionOfBorders),
                population: parseInt(population),
                territorialExtension: parseInt(territorialExtension)
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
                } else {
                    anadirAlerta()
                }
            });
        }
    }]);