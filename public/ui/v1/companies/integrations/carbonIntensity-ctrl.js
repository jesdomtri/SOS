/*global angular, RGraph*/

angular.module("PostmanApp").
controller("carbonIntensityCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //RGRAPH
    $http.get("https://api.carbonintensity.org.uk/regional").then(function(response) {

        var regiones = response.data.data[0].regions;
        console.log(regiones);

        var shortnames = [];
        regiones.forEach(function(sn) { if (shortnames.length <= 5) { shortnames.push(sn.shortname) } });
        console.log(shortnames);

        var intensities = [];
        regiones.forEach(function(int) { if (intensities.length <= 5) { intensities.push(int.intensity.forecast) } });
        console.log(intensities);

        new RGraph.SVG.Bar({
            id: 'chart-container',
            data: intensities,
            options: {
                marginTop: 50,
                marginBottom: 75,
                marginInner: 20,
                xaxisLabels: shortnames,
                tooltips: shortnames,
                title: 'Cinco primeros valores de Carbon Intensity',
                titleSubtitle: '',
                titleSubtitleItalic: true,
                colors: ['blue', 'pink'],
                shadow: true,
                shadowOpacity: 0.2
            }
        }).draw();

    })
}]);
