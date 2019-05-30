/*global angular, Highcharts, Chartist*/

angular.module("PostmanApp").
controller("uefaClubRankingsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiUCRS = "/proxyUefaClubRankings";

    //Chartist
    $http.get(apiUCRS).then(function(response) {

        var tablaUCRPaises = [];
        var tablaUCRPuntos = [];

        var paisesUCR = response.data.map(function(d) { return d.country });
        var añosUCR = response.data.map(function(d) { return d.season });
        var pointsUCR = response.data.map(function(d) { return d.points });

        for (var i = 0; i < paisesUCR.length; i++) {
            if (añosUCR[i] == 2017) {
                tablaUCRPaises.push(paisesUCR[i]);
                tablaUCRPuntos.push(pointsUCR[i]);
            }
        }

        $http.get("/api/v1/country-stats").then(function(response) {

            var tablaCompPaises = [];
            var tablaPop = [];

            var paisesComp = response.data.map(function(d) { return d.country });
            var añosComp = response.data.map(function(d) { return d.year });
            var population = response.data.map(function(d) { return d.population });

            for (var i = 0; i < paisesComp.length; i++) {
                if (añosComp[i] == 2017) {
                    tablaCompPaises.push(paisesComp[i]);
                    tablaPop.push(population[i]);
                }
            }

            var paisesFinales = [];
            var puntosFinales = [];
            var numPopFinales = [];

            for (var i = 0; i < tablaCompPaises.length; i++) {
                if (!tablaUCRPaises.includes(tablaCompPaises[i])) {
                    paisesFinales.push(tablaCompPaises[i]);
                }
            }

            for (var i = 0; i < tablaUCRPaises.length; i++) {
                paisesFinales.push(tablaUCRPaises[i]);
            }

            for (var i = 0; i < paisesFinales.length; i++) {
                if (tablaUCRPaises.includes(paisesFinales[i]) && tablaCompPaises.includes(paisesFinales[i])) {
                    puntosFinales.push((tablaUCRPuntos[tablaUCRPaises.indexOf(paisesFinales[i])])/100);
                    numPopFinales.push((tablaPop[tablaCompPaises.indexOf(paisesFinales[i])])/100000);
                }
                if (tablaUCRPaises.includes(paisesFinales[i]) && !tablaCompPaises.includes(paisesFinales[i])) {
                    puntosFinales.push((tablaUCRPuntos[tablaUCRPaises.indexOf(paisesFinales[i])])/100);
                    numPopFinales.push(0);
                }
                if (!tablaUCRPaises.includes(paisesFinales[i]) && tablaCompPaises.includes(paisesFinales[i])) {
                    puntosFinales.push(0);
                    numPopFinales.push((tablaPop[tablaCompPaises.indexOf(paisesFinales[i])])/100000);
                }
            }

            console.log(paisesFinales);
            console.log(puntosFinales);
            console.log(numPopFinales);

            new Chartist.Bar('.ct-chart', {
                labels: paisesFinales,
                series: [
                    puntosFinales,
                    numPopFinales
                ]
            }, {
                axisX: {
                    // On the x-axis start means top and end means bottom
                    position: 'start'
                },
                axisY: {
                    // On the y-axis start means left and end means right
                    position: 'end'
                }
            });



        })
    })
}]);
