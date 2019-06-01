/*global angular, Highcharts, Chartist, RGraph*/

angular.module("PostmanApp").
controller("companiesCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //HIGHCHARTS
    $http.get("https://sos1819-03.herokuapp.com/api/v1/companies").then(function(response) {

        var filteredcountry = [];
        var filteredsector = [];

        var nameApi = response.data.map(function(d) { return d.country });
        var yearApi = response.data.map(function(d) { return d.year });
        var sectorApi = response.data.map(function(d) { return d.sector });

        for (var i = 0; i < nameApi.length; i++) {
            if (yearApi[i] == 2017) {
                filteredcountry.push(nameApi[i]);
                filteredsector.push(sectorApi[i]);
            }
        }

        console.log(filteredcountry);
        console.log(filteredsector);

        new RGraph.SVG.Pie({
            id: 'cc',
            data: filteredsector,
            options: {
                labels: filteredcountry,
                labelsSticks: false,
                exploded: 5,
                donut: true
            }
        }).on('draw', function(obj) {
            var svg = obj.svg,
                path = '';

            var r = obj.radius;

            while (r > 0) {
                path =
                    RGraph.SVG.TRIG.getArcPath3({
                        cx: obj.centerx,
                        cy: obj.centery,
                        r: r,
                        start: 0,
                        end: 3.1415 * 2,
                        anticlockwise: false,
                        lineto: false
                    }) + " " +
                    RGraph.SVG.TRIG.getArcPath3({
                        cx: obj.centerx,
                        cy: obj.centery,
                        r: r - 5,
                        start: 3.1415 * 2,
                        end: 0,
                        anticlockwise: true,
                        lineto: true
                    }) + ' Z'

                RGraph.SVG.create({
                    svg: svg,
                    type: 'path',
                    parent: obj.svg.all,
                    attr: {
                        d: path,
                        fill: 'white'
                    }
                });

                r -= 10;
            }
        }).roundRobin({ frames: 90 });
    })
}]);
