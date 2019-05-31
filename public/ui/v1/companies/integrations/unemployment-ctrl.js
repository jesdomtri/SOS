/*global angular, Chartist*/

angular.module("PostmanApp").
controller("unemploymentCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    var apiU = "/proxyUnemployment";

    $http.get(apiU).then(function(response) {

        var paisesAndres = response.data.map(function(d) { return d.country });
        var abandonoAndres = response.data.map(function(d) { return d.youth_unemployment });

        $http.get("/api/v1/companies").then(function(response) {

            var paisesJesus = response.data.map(function(d) { return d.country });
            var companiesJesus = response.data.map(function(d) { return d.numberOfCompanies });

            var tam = 0;

            if (paisesJesus.length < paisesAndres.length) {
                tam = paisesAndres.length;
            }
            else {
                tam = paisesJesus.length;
            }

            var paises = [];

            paisesAndres.forEach(function(p) { paises.push(p) });
            paisesJesus.forEach(function(p) { paises.push(p) });

            var paisesUnificados = []

            for (var i = 0; i < tam; i++) {
                if (paisesJesus.includes(paises[i]) && paisesAndres.includes(paises[i]) && !paisesUnificados.includes(paises[i])) {
                    paisesUnificados.push(paises[i]);
                }
            }

            var puntosUnificados = [];
            var companiesUnificados = [];

            for (var i = 0; i < paisesUnificados.length; i++) {
                puntosUnificados.push(parseInt(abandonoAndres[paisesAndres.indexOf(paisesUnificados[i])]));
                companiesUnificados.push(parseInt(companiesJesus[paisesJesus.indexOf(paisesUnificados[i])]) / 100000);
            }

            console.log(paisesUnificados);
            console.log(puntosUnificados);
            console.log(companiesUnificados);

            new Chartist.Line('.ct-chart', {
                labels: paisesUnificados,
                series: [
                    puntosUnificados,
                    companiesUnificados
                ]
            }, {
                fullWidth: true,
                chartPadding: {
                    right: 40
                }
            });


        })
    })

}]);
