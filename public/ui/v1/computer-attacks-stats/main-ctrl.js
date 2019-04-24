    
    /*global angular $scope location*/
    
    var app = angular.module("PostmanApp");
  
    app.controller("MainCtrl",["$scope","$http", function ($scope,$http) {
        console.log("MainCtrl initialized");
        $scope.url = "/api/v1/computers-attacks-stats";
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.datos = 0;
         
         refresh();
         numDatos();
       
          function numDatos() {
        $http.get($scope.url).then(function(response) {
            $scope.datos = response.data.length;
        });
    }

       function refresh() {
      $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.attacks = response.data;
            $scope.status = response.status;

        }, function(response) {
            $scope.attacks = response.attacks || 'Request failed';
            $scope.status = response.status;
        });
    }
        $scope.avanzar = function() {
            if ($scope.offset + $scope.limit <= $scope.datos) {
                $scope.offset = $scope.offset + $scope.limit;
                refresh();
            }
        }
    
        $scope.retroceder = function() {
            $scope.offset = $scope.offset - $scope.limit;
            refresh();
        }
        
        function resfreshCountry(country) {
        $http.get($scope.url + "/" + country).then(function(response) {
            $scope.attacks = response.data;
            $scope.status = response.status;

        }, function(response) {
            $scope.attacks = response.attacks || 'Request failed';
            $scope.status = response.status;
        });
    }
         function refreshFromTo(from, to) {
        $http.get($scope.url + "?from=" + from + "&to=" + to).then(function(response) {
            $scope.attacks = response.data;
            $scope.status = response.status;

        }, function(response) {
            $scope.attacks = response.attacks || 'Request failed';
            $scope.status = response.status;
        });
    }
        function refreshpage() {
        location.reload();
    }
     $scope.setPage = function(index) {
        $scope.currentPage = index - 1;
    };
        $scope.alerts = [];

    function anadirAlerta() {
        if ($scope.status == 200) {
            $scope.alerts = [];
            console.log("Alerta correcta añadida");
            $scope.alerts.push({ msg: '¡Acción realizada correctamente!' });
        }
        if ($scope.status == 201) {
            $scope.alerts = [];
            console.log("Alerta correcta añadida");
            $scope.alerts.push({ msg: '¡Se ha creado un nuevo dato correctamente!' });
        }
        if ($scope.status == 404) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({ msg: 'Error 404: No se ha podido encontrar el recurso' });
        }
        if ($scope.status == 409) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({ msg: 'Error 409: Ha habido conflicto en su operación' });
        }
        if ($scope.status == 405) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({ msg: 'Error 405: Ha realizado una creación errónea' });
        }
        if ($scope.status == 400) {
            $scope.alerts = [];
            console.log("Alerta mala añadida");
            $scope.alerts.push({ msg: 'Error 400: Ha realizado una solicitud errónea' });
        }
    }

    function anadirAlertaCountry(country) {
        if ($scope.status == 404) {
            $scope.alerts = [];
            console.log("Alerta mal añadida  country");
            $scope.alerts.push({ msg: 'Error 404: No se ha podido encontrar el recurso ' + country });
        }
    }
        $scope.get = function(){
          
            $http.get($scope.url).then( function(response){
                $scope.data=JSON.stringify(response.data,null,2);
                $scope.country = response.data.country;
                $scope.year = response.data.year;
                $scope.attacktype = response.data.attacktype;
                $scope.economicimpactmillions = response.data.economicimpactmillions;
                $scope.affectedequipments = response.data.affectedequipments;
                $scope.overallpercentage=response.data.overallpercentage;
                $scope.status = JSON.stringify(response.status,null,2);
                refresh();
                anadirAlerta();
       
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta();
        });
    };
      $scope.getCountry = function(country) {
        if (country == undefined) { country = "" }
        $http.get($scope.url + "/" + country).then(function(response) {
            console.log("Get done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.country = response.data.country;
            $scope.year = response.data.year;
            $scope.attacktype = response.data.attacktype;
            $scope.economicimpactmillions = response.data.economicimpactmillions;
            $scope.affectedequipments = response.data.affectedequipments;
            $scope.overallpercentage=response.data.overallpercentage;
            $scope.status = JSON.stringify(response.status, null, 2);
            resfreshCountry(country);
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlertaCountry(country);
        });
    };
         $scope.getFromTo = function(from, to) {
        $http.get($scope.url + "?from=" + from + "&to=" + to).then(function(response) {
            console.log("Get done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.country = response.data.country;
            $scope.year = response.data.year;
            $scope.attacktype = response.data.attacktype;
            $scope.economicimpactmillions = response.data.economicimpactmillions;
            $scope.affectedequipments = response.data.affectedequipments;
            $scope.overallpercentage=response.data.overallpercentage;
            $scope.status = JSON.stringify(response.status, null, 2);
            refreshFromTo(from, to);
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta();
        });
    };
      
      
        $scope.loadinitial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta();
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
          if ($scope.status == 409) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error 409: No puede haber datos si quiere cargar los datos iniciales" })
            }
            else {
                anadirAlerta()
            }
        
      });
    };
       
        $scope.del = function(){
           
            $http.delete($scope.url).then(function(response){
                $scope.data = JSON.stringify(response.data,null,2);
                $scope.status=JSON.stringify(response.status,null,2);
                 refresh();
            anadirAlerta();
          
            } , function (response){
               
                $scope.data=response.data || "Request failed";
                $scope.status = response.status;
            anadirAlerta();
            });
        };
      
      $scope.delTable = function(country, year , attacktype) {
        $http.delete($scope.url + "/" + country + "/" + year+ "/" + attacktype).then(function(response) {
            console.log("Delete one done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta();
        });
    };
      
      
      
        
        $scope.post = function() { 
            
            $http.post(
                $scope.url,{
                    country : $scope.country,
                    year :parseInt($scope.year),
                    attacktype: $scope.attacktype,
                    economicimpactmillions: parseFloat($scope.economicimpactmillions),
                    affectedequipments:parseInt($scope.affectedequipments),
                    overallpercentage: parseFloat($scope.overallpercentage)
            
                }).then(function(response){
                  
                    $scope.data= JSON.stringify(response.data,null,2);
                    $scope.status=JSON.stringify(response.status,null,2);
                    refresh();
                    anadirAlerta();
                },function(response){// esta segunda funcónes para que muestre los fallos si se dan .
               
                $scope.data=response.data || "Request failed";
                $scope.status=response.status;
                anadirAlerta();
                });
        };
        
         
            $scope.postJSON = function() {
        $http.post($scope.url, $scope.data).then(function(response) {
            $scope.data = "";
            $scope.status = JSON.stringify(response.status, null, 2);
             refresh();
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta();
        });
    };
    $scope.postTable = function(country,year,attacktype,economicimpactmillions,affectedequipments,overallpercentage) {
        $http.post($scope.url, {
            country : $scope.country,
            year : parseInt($scope.year),
            attacktype: $scope.attacktype,
            economicimpactmillions: parseFloat($scope.economicimpactmillions),
            affectedequipments:  parseInt($scope.affectedequipments),
            overallpercentage: parseFloat($scope.overallpercentage)
        }).then(function(response) {
            console.log("Post table done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refreshpage();
            anadirAlerta();
        },function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            if ($scope.status == 409) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error 409: Ya existe este recurso" })
            }
            else if ($scope.status == 400) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error 400: Datos insuficientes" })
            }
            else {
                anadirAlerta()
            }
        });
    };
        
       $scope.put = function() {
        $http.put($scope.url, {
            country: $scope.country,
            year: parseInt($scope.year),
            attacktype: $scope.attacktype,
            economicimpactmillions:parseFloat($scope.economicimpactmillions),
            affectedequipments: parseInt($scope.affectedequipments),
            overallpercentage:parseFloat( $scope.overallpercentage)
        }).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta();
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
          anadirAlerta();
      });
    };
        
        
         $scope.putJSON = function() {
        $http.put($scope.url, $scope.data).then(function(response) {
            $scope.data = "";
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta();
        });
    };
    $scope.putTable = function(country,year,attacktype,economicimpactmillions,affectedequipments,overallpercentage) {
        $http.put($scope.url + "/" + country + "/" + year, {
            country: $scope.country,
            year: parseInt($scope.year),
            attacktype: $scope.attacktype,
            economicimpactmillions:parseFloat($scope.economicimpactmillions),
            affectedequipments: parseInt($scope.affectedequipments),
            overallpercentage:parseFloat( $scope.overallpercentage)
        }).then(function(response) {
            console.log("Put table done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
            refresh();
            anadirAlerta();
        },  function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            if ($scope.status == 400) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error 400: Datos insuficientes" })
            }
            else {
                anadirAlerta()
            }
        });
    };
        
        
        
    }]).filter("startFrom", function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    };
});