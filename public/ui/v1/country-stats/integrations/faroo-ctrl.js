/*global angular, Highcharts, unirest, Chartist*/

angular.module("PostmanApp").
controller("farooCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //API JSON
    var config = {
        headers: {
            "X-RapidAPI-Host": "faroo-faroo-web-search.p.rapidapi.com",
            "X-RapidAPI-Key": "25f48dfb04msh450bc3636166719p1bfbebjsn7dfb27226625"
        }
    };

    $http.get("https://faroo-faroo-web-search.p.rapidapi.com/api?q=test", config).then(function(response) {

        var domain = [];
        var AuthorRecognized = 0;
        var NoAuthorRecognized = 0;

        for (var i = 0; i < response.data.results.length; i++) {
            domain.push(response.data.results[i].author);
        }

        for (var i = 0; i < domain.length; i++) {
            if (domain[i] == "") {
                NoAuthorRecognized = NoAuthorRecognized + 1;
            }
            else {
                AuthorRecognized = AuthorRecognized + 1;
            };
        }

        console.log(domain);
        console.log(AuthorRecognized);
        console.log(NoAuthorRecognized);

        // Create the chart
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Autores reconocidos en webpages buscadas por "test"'
            },
            xAxis: {
                title: {
                    text: 'Categoría'
                }
            },
            yAxis: {
                title: {
                    text: 'Número total de webpages'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> companies<br/>'
            },

            series: [{
                colorByPoint: true,
                data: [{
                        name: "Autor reconocido",
                        colorByPoint: true,
                        y: AuthorRecognized
                    },
                    {
                        name: "Autor NO reconocido",
                        colorByPoint: true,
                        y: NoAuthorRecognized
                    }
                ]
            }]
        });
    })
}]);
