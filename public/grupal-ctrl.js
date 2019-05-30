/*global angular,Highcharts,google,RGraph*/

angular.module("PostmanApp").
controller("grupalCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("/api/v1/companies").then(function(response) {

        var paisesCompanies = [];
        var numCompanies = [];

        var uno = response.data.map(function(d) { return d.country });
        var dos = response.data.map(function(d) { return d.year });
        var siete = response.data.map(function(d) { return d.numberOfCompanies });

        for (var i = 0; i < uno.length; i++) {
            if (dos[i] == "2017") {
                paisesCompanies.push(uno[i]);
                numCompanies.push(siete[i]);
            }
        }

        $http.get("/api/v1/country-stats").then(function(response) {

            var paisesCountryStats = [];
            var poblacionCountryStats = [];

            var tres = response.data.map(function(d) { return d.country });
            var cuatro = response.data.map(function(d) { return d.year });
            var ocho = response.data.map(function(d) { return parseInt(d.population)/100 });
            
            for (var i = 0; i < tres.length; i++) {
                if (cuatro[i] == "2017") {
                    paisesCountryStats.push(tres[i]);
                    poblacionCountryStats.push(ocho[i]);
                }
            }

            $http.get("/api/v1/computers-attacks-stats").then(function(response) {

                var paisesAttacks = [];
                var equiposAttacks = [];

                var cinco = response.data.map(function(d) { return d.country });
                var seis = response.data.map(function(d) { return d.year });
                var nueve = response.data.map(function(d) { return d.affectedequipments });

                for (var i = 0; i < cinco.length; i++) {
                    if (seis[i] == "2017") {
                        paisesAttacks.push(cinco[i]);
                        equiposAttacks.push(nueve[i]);
                    }
                }

                console.log("DATOS SACADOS DE NUESTRAS APIS");
                console.log(paisesCompanies);
                console.log(numCompanies);
                console.log(paisesCountryStats);
                console.log(poblacionCountryStats);
                console.log(paisesAttacks);
                console.log(equiposAttacks);

                console.log("DATOS UNIFICADOS PARA LA INTEGRACION");

                var paisesUnif = []

                paisesCompanies.forEach(function(p) { if (!paisesUnif.includes(p)) { paisesUnif.push(p) } });
                paisesCountryStats.forEach(function(p) { if (!paisesUnif.includes(p)) { paisesUnif.push(p) } });
                paisesAttacks.forEach(function(p) { if (!paisesUnif.includes(p)) { paisesUnif.push(p) } });

                var numCompaniesUnif = [];
                var poblacionUnif = [];
                var equiposUnif = [];

                for (var i = 0; i < paisesUnif.length; i++) {
                    if (paisesCompanies.includes(paisesUnif[i])) {
                        numCompaniesUnif.push(numCompanies[paisesCompanies.indexOf(paisesUnif[i])]);
                    }
                    else {
                        numCompaniesUnif.push(0);
                    }
                }
                for (var i = 0; i < paisesUnif.length; i++) {
                    if (paisesCountryStats.includes(paisesUnif[i])) {
                        poblacionUnif.push(poblacionCountryStats[paisesCountryStats.indexOf(paisesUnif[i])]);
                    }
                    else {
                        poblacionUnif.push(0);
                    }
                }
                for (var i = 0; i < paisesUnif.length; i++) {
                    if (paisesAttacks.includes(paisesUnif[i])) {
                        equiposUnif.push(equiposAttacks[paisesAttacks.indexOf(paisesUnif[i])]);
                    }
                    else {
                        equiposUnif.push(0);
                    }
                }

                console.log(paisesUnif);
                console.log(numCompaniesUnif);
                console.log(poblacionUnif);
                console.log(equiposUnif);

                var datos = [];

                datos.push({ name: "NumCompañías", data: numCompaniesUnif });
                datos.push({ name: "Población", data: poblacionUnif });
                datos.push({ name: "EquiposInfect", data: equiposUnif });

                console.log(datos);

                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: paisesUnif
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                            }
                        }
                    },
                    legend: {
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
                        }
                    },
                    series: datos
                });

            })
        })
    })


}]);
