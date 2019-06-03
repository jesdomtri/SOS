/*global angular, RGraph, google*/

angular.module("PostmanApp").controller("C5", ["$scope", "$http", "$httpParamSerializer", 
    function($scope, $http, $httpParamSerializer) {
   
   
   $http.get("https://sos1819-03.herokuapp.com/api/v1/country-stats ")
    .then(function(response) {

        
        var valores = [];
        valores.push(["Pais","Año","Population","Extension territorial "]);
        
        var paisAPI = response.data.map(function(d) { return d.country});
        var añoAPI = response.data.map(function(d) { return d.year});
        var populationAPI = response.data.map(function(d) { return d.population });
        var territorialAPI = response.data.map(function(d) { return d.territorialExtension});
        
        for (var i = 0; i < paisAPI.length; i++) {
            
               valores.push([ paisAPI[i],añoAPI[i],populationAPI[i],territorialAPI[i]]);
                
            
        } 
    console.log("paisAPI");
       console.log(valores);
       google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable(valores);

      var options = {
        title: 'Datos de compañias .' ,
        hAxis: {title: 'Años'},
        vAxis: {title: 'Población'},
        bubble: {textStyle: {fontSize: 11}}
      };
       var chart = new google.visualization.BubbleChart(document.getElementById('container5'));
      chart.draw(data, options);
}
       
    })
    }]);