/*global angular, Highcharts*/

angular.module("PostmanApp").
controller("universitiesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    $http.get("https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json").then(function(response) {
        var datos = [];
        for (var i = 0; i < response.data.length; i++) {
            datos.push({ name: response.data[i].name, country: response.data[i].country });
        }
        //$scope.data = JSON.stringify(response.data, null, 2);
        $scope.data = JSON.stringify(datos, null, 2);
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    })

    $http.get("https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json").then(function(response) {

        var paises = [];
        var universidades = [];

        for (var i = 0; i < response.data.length; i++) {
            if (!paises.includes(response.data[i].country)) {
                paises.push(response.data[i].country);
            }
        }

        for (var i = 0; i < paises.length; i++) {
            var num = 0;
            for (var j = 0; j < response.data.length; j++) {
                if (paises[i] == response.data[j].country) {
                    num = num + 1;
                }
            }
            universidades.push(num);
        }

        //console.log(paises);
        //console.log(universidades);

        var tabla = [];
        //tabla.push(['Country', 'Universities']);

        for (var i = 0; i < paises.length; i++) {
            tabla.push({ name: paises[i], weight: universidades[i] })
        }

        console.log(tabla);

        Highcharts.chart('container', {
            series: [{
                type: 'wordcloud',
                data: tabla,
                name: 'Universidades'
            }],
            title: {
                text: ''
            }
        });

    })

}]);
