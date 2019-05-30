/*global angular, Highcharts*/

angular.module("PostmanApp").
controller("scorersCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("https://sos1819-02.herokuapp.com/api/v1/scorers-stats").then(function(response) {

        var paisesAlberto = response.data.map(function(d) { return d.country });
        var puntosAlberto = response.data.map(function(d) { return d.scorermatch });

        $http.get("/api/v1/companies").then(function(response) {

            var paisesJesus = response.data.map(function(d) { return d.country });
            var companiesJesus = response.data.map(function(d) { return d.numberOfCompanies });
            
            var tam = 0;

            if (paisesJesus.length < paisesAlberto.length) {
                tam = paisesAlberto.length;
            }
            else {
                tam = paisesJesus.length;
            }

            var paises = [];

            paisesAlberto.forEach(function(p) { paises.push(p) });
            paisesJesus.forEach(function(p) { paises.push(p) });

            var paisesUnificados = []

            for (var i = 0; i < tam; i++) {
                if (paisesJesus.includes(paises[i]) && paisesAlberto.includes(paises[i]) && !paisesUnificados.includes(paises[i])) {
                    paisesUnificados.push(paises[i]);
                }
            }

            var puntosUnificados = [];
            var companiesUnificados = [];

            for (var i = 0; i < paisesUnificados.length; i++) {
                puntosUnificados.push(parseInt(puntosAlberto[paisesAlberto.indexOf(paisesUnificados[i])]));
                companiesUnificados.push(parseInt(companiesJesus[paisesJesus.indexOf(paisesUnificados[i])])/1000);
            }

            console.log(paisesUnificados);
            console.log(puntosUnificados);
            console.log(companiesUnificados);


            var datos = []

            datos.push({ name: "Número de compañías", data: companiesUnificados });
            datos.push({ name: "Puntos de partido", data: puntosUnificados });

            Highcharts.chart('container', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: paisesUnificados
                },
                credits: {
                    enabled: false
                },
                series: datos
            });


        })
    })

}]);
