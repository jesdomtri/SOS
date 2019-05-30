/*global angular, Chartist, RGraph*/

angular.module("PostmanApp").
controller("uefaCountryRankingsCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    var apiUCR = "/proxyUefaCountryRankings";

    //API JSON

    $http.get(apiUCR).then(function(response) {
        $scope.datos = response.data;
        $scope.status = response.status;
    }, function(response) {
        $scope.datos = response.data || 'Request failed';
        $scope.status = response.status;
    })


    //CHARTIST
    $http.get(apiUCR).then(function(response) {
        var tabla = [];

        var paisesApi = response.data.map(function(d) { return d.country });
        var añosApi = response.data.map(function(d) { return d.season });
        var pointsApi = response.data.map(function(d) { return d.points });

        for (var i = 0; i < paisesApi.length; i++) {
            if (añosApi[i] == 2017) {
                tabla.push([paisesApi[i], pointsApi[i]]);
            }
        }

        var paisesFinales = [];
        var pointsFinales = [];
        for (var i = 0; i < tabla.length; i++) {
            paisesFinales.push(tabla[i][0]);
            pointsFinales.push(tabla[i][1]);
        }

        var data = {
            labels: paisesFinales,
            series: pointsFinales
        };

        var options = {
            labelInterpolationFnc: function(value) {
                return value[0]
            }
        };

        var responsiveOptions = [
            ['screen and (min-width: 640px)', {
                chartPadding: 30,
                labelOffset: 0,
                labelDirection: 'explode',
                labelInterpolationFnc: function(value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 0,
                chartPadding: 20
            }]
        ];

        new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
    })

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

        $http.get("/api/v1/companies").then(function(response) {

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
            }).trace();
        })
    })
}]);
