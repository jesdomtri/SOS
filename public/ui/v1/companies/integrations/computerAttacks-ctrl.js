/*global angular, Plotly*/

angular.module("PostmanApp").
controller("computerAttacksCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {


    $http.get("/api/v1/computers-attacks-stats").then(function(response) {

        var paisesJoaquin = response.data.map(function(d) { return d.country });
        var ataquesJoaquin = response.data.map(function(d) { return d.affectedequipments });

        $http.get("/api/v1/companies").then(function(response) {

            var paisesJesus = response.data.map(function(d) { return d.country });
            var companiesJesus = response.data.map(function(d) { return d.numberOfCompanies });

            var tam = 0;

            if (paisesJesus.length < paisesJoaquin.length) {
                tam = paisesJoaquin.length;
            }
            else {
                tam = paisesJesus.length;
            }

            var paises = [];

            paisesJoaquin.forEach(function(p) { paises.push(p) });
            paisesJesus.forEach(function(p) { paises.push(p) });

            var paisesUnificados = []

            for (var i = 0; i < tam; i++) {
                if (paisesJesus.includes(paises[i]) && paisesJoaquin.includes(paises[i]) && !paisesUnificados.includes(paises[i])) {
                    paisesUnificados.push(paises[i]);
                }
            }

            var puntosUnificados = [];
            var companiesUnificados = [];

            for (var i = 0; i < paisesUnificados.length; i++) {
                puntosUnificados.push(parseInt(ataquesJoaquin[paisesJoaquin.indexOf(paisesUnificados[i])]));
                companiesUnificados.push(parseInt(companiesJesus[paisesJesus.indexOf(paisesUnificados[i])]) / 10);
            }

            console.log(paisesUnificados);
            console.log(puntosUnificados);
            console.log(companiesUnificados);

            var trace1 = {
                x: paisesUnificados,
                y: companiesUnificados,
                type: 'scatter'
            };

            var trace2 = {
                x: paisesUnificados,
                y: puntosUnificados,
                type: 'scatter'
            };

            var data = [trace1, trace2];

            Plotly.newPlot('myDiv', data);


        })
    })

}]);
