/*global angular, Highcharts, unirest, Chartist, google, am4core, am4charts*/

angular.module("PostmanApp").
controller("jailBaseCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //API JSON
    var config = {
        headers: {
            "X-RapidAPI-Host": "jailbase-jailbase.p.rapidapi.com",
            "X-RapidAPI-Key": "25f48dfb04msh450bc3636166719p1bfbebjsn7dfb27226625"
        }
    };

    $http.get("https://jailbase-jailbase.p.rapidapi.com/recent/?source_id=az-mcso", config).then(function(response) {

        var charges = [];
        var nameapi = [];

        for (var i = 0; i < response.data.records.length; i++) {

            charges.push(response.data.records[i].charges.length);
            nameapi.push(response.data.records[i].name);
        }

        console.log(charges);
        console.log(nameapi);

        am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.RadarChart);
            chart.scrollbarX = new am4core.Scrollbar();

            var data = [];

            for (var i = 0; i < charges.length; i++) {
                data.push({ category: nameapi[i], value: charges[i] });
            }

            chart.data = data;
            chart.radius = am4core.percent(100);
            chart.innerRadius = am4core.percent(10);

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;
            categoryAxis.renderer.grid.template.disabled = true;
            //categoryAxis.renderer.labels.template.disabled = true;
            let labelTemplate = categoryAxis.renderer.labels.template;
            labelTemplate.radius = am4core.percent(-60);
            labelTemplate.location = 1;
            labelTemplate.relativeRotation = 90;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.grid.template.disabled = true;
            valueAxis.renderer.labels.template.disabled = true;
            valueAxis.tooltip.disabled = true;

            // Create series
            var series = chart.series.push(new am4charts.RadarColumnSeries());
            series.sequencedInterpolation = true;
            series.dataFields.valueY = "value";
            series.dataFields.categoryX = "category";
            series.columns.template.strokeWidth = 0;
            series.tooltipText = "{valueY}";
            series.columns.template.radarColumn.cornerRadius = 10;
            series.columns.template.radarColumn.innerCornerRadius = 0;

            series.tooltip.pointerOrientation = "vertical";

            // on hover, make corner radiuses bigger
            let hoverState = series.columns.template.radarColumn.states.create("hover");
            hoverState.properties.cornerRadius = 0;
            hoverState.properties.fillOpacity = 1;


            series.columns.template.adapter.add("fill", function(fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            })

            // Cursor
            chart.cursor = new am4charts.RadarCursor();
            chart.cursor.innerRadius = am4core.percent(50);
            chart.cursor.lineY.disabled = true;

        });

    })
}]);
