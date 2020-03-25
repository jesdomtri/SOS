/*global angular, RGraph*/
console.log("a");
angular.module("PostmanApp").
controller("uefaCountryRankingsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiUCR = "/proxyUefaCountryRankings";
console.log("b");
    //RGRAPH
    $http.get(apiUCR).then(function(response) {

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
console.log("c");
        $http.get("/api/v1/companies").then(function(response) {
console.log("d");
            var tablaCompPaises = [];
            var tablaCompNum = [];

            var paisesComp = response.data.map(function(d) { return d.country });
            var añosComp = response.data.map(function(d) { return d.year });
            var numberOfCompanies = response.data.map(function(d) { return d.numberOfCompanies });

            for (var i = 0; i < paisesComp.length; i++) {
                if (añosComp[i] == 2017) {
                    tablaCompPaises.push(paisesComp[i]);
                    tablaCompNum.push(numberOfCompanies[i]);
                }
            }

            var paisesFinales = [];
            var puntosFinales = [];
            var numCompFinales = [];

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
                    puntosFinales.push(tablaUCRPuntos[tablaUCRPaises.indexOf(paisesFinales[i])]);
                    numCompFinales.push(tablaCompNum[tablaCompPaises.indexOf(paisesFinales[i])]);
                }
                if (tablaUCRPaises.includes(paisesFinales[i]) && !tablaCompPaises.includes(paisesFinales[i])) {
                    puntosFinales.push(tablaUCRPuntos[tablaUCRPaises.indexOf(paisesFinales[i])]);
                    numCompFinales.push(0);
                }
                if (!tablaUCRPaises.includes(paisesFinales[i]) && tablaCompPaises.includes(paisesFinales[i])) {
                    puntosFinales.push(0);
                    numCompFinales.push(tablaCompNum[tablaCompPaises.indexOf(paisesFinales[i])]);
                }
            }

            console.log(paisesFinales);
            console.log(puntosFinales);
            console.log(numCompFinales);

            var line = new RGraph.SVG.Line({
                id: 'chart-container',
                data: [
                    puntosFinales,
                    numCompFinales
                ],
                options: {
                    xaxisLabels: paisesFinales,
                    yaxisScaleUnitsPost: '',
                    xaxisTextColor: '#333',
                    yaxisTextColor: '#333',
                    marginLeft: 40,
                    marginTop: 35,
                    marginRight: 15,
                    marginBottom: 50,
                    colors: ['red', 'green'],
                    linewidth: 7,
                    shadow: true,
                    shadowBlur: 3,
                    shadowOpacity: 0.25,
                    spline: true

                }
//console.log("e");
            }).trace();
console.log("f");
        });
    
console.log("g");
    });
console.log("h");
}]);
console.log("i");

