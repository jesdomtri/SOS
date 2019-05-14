    
    /*global angular $scope location*/
    
    angular.module("PostmanApp").controller("ListCtrlAttacks",["$scope","$http", function ($scope,$http) {
        console.log("ListCtrlAttacks initialized");
        $scope.url = "/api/v1/computer-attacks-stats";
        $scope.offset = 0;
        $scope.limit = 10;
        $scope.datos = 0;
        refresh();
        numDatos();
   ///////////////////////////////////////////////////////////////////////////////////////////////////    
          function numDatos() {
        $http.get($scope.url).then(function(response) {
            $scope.datos = response.data.length;
        });
    }
       function refresh() {
        $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.attacks = response.data;
            $scope.status = response.status;
            numDatos();
        }, function(response) {
            $scope.attacks = response.attacks || 'Request failed';
            $scope.status = response.status;
        });
    }
    
      function refreshFilters(countrySearch ,from, to,attacktypeSearch, mineco, maxeco, minaff, maxaff, minove, maxove) {
        $http.get($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset + from + to +
        mineco + maxeco + minaff + maxaff + minove + maxove).then(function(response) {
            $scope.attacks = response.data;
            $scope.status = response.status;
            numDatos();
        }, function(response) {
            $scope.attacks = response.attacks || 'Request failed';
            $scope.status = response.status;
        });
    }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        $scope.clearInput = function() {
        console.log("Reseteamos");
        document.getElementById('country').value = '';
        document.getElementById('year').value = '';
        document.getElementById('attacktype').value = '';
        document.getElementById('economicimpactmillions').value = '';
        document.getElementById('affectedequipments').value = '';
        document.getElementById('overallpercentage').value = '';
    };
      
        $scope.avanzar = function() {
        $scope.offset = $scope.offset + $scope.limit;
        refresh();
       };
    
       $scope.retroceder = function() {
        $scope.offset = $scope.offset - $scope.limit;
          refresh();
    };
    
     $scope.getFilters = function(countrySearch ,from, to,attacktypeSearch, mineco, maxeco, minaff, maxaff, minove, maxove) {
        //country
        if (countrySearch == "" || countrySearch == undefined) {
            countrySearch = "";
        }
        else {
            countrySearch = "/" + countrySearch;
        }
        //year
        if (from == "" || from == undefined) {
            from = "&from=0";
        }
        else {
            from = "&from=" + from;
        }
        if (to == "" || to == undefined) {
            to = "&to=2000000000";
        }
        else {
            to = "&to=" + to;
        }
         //attacktype
        if (attacktypeSearch == "" || attacktypeSearch == undefined) {
            attacktypeSearch = "";
        }
        else {
            attacktypeSearch = "/" + attacktypeSearch;
        }
        //economicimpactmillions
        if (mineco == "" || mineco == undefined) {
            mineco = "&mineco=0";
        }
        else {
            mineco = "&mineco=" + mineco;
        }
        if (maxeco == "" || maxeco == undefined) {
            maxeco = "&maxeco=2000000000";
        }
        else {
            maxeco = "&maxeco=" + maxeco;
        }
         //affectedequipments
        if (minaff == "" || minaff == undefined) {
            minaff = "&minaff=0";
        }
        else {
            minaff = "&minaff=" + minaff;
        }
        if (maxaff == "" || maxaff == undefined) {
            maxaff = "&maxaff=2000000000";
        }
        else {
            maxaff = "&maxaff=" + maxaff;
        }
        // overallpercentage    
        if (minove == "" || minove == undefined) {
            minove = "&minove=0";
        }
        else {
            minove = "&minove=" + minove;
        }
        if (maxove == "" || maxove == undefined) {
           maxove = "&maxove=2000000000";
        }
        else {
            maxove = "&maxove=" + maxove;
        }
         console.log($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset + from + to + attacktypeSearch+ mineco+maxeco+minaff+maxaff+minove+maxove);
        $http.get($scope.url + countrySearch + "?limit=" + $scope.limit + "&offset=" + $scope.offset + from + to + attacktypeSearch+ mineco+maxeco+minaff+maxaff+minove+maxove).then(function(response) {
            console.log("Get filters done");
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.country = response.data.country;
            $scope.year = response.data.year;
            $scope.attacktype = response.data.attacktype;
            $scope.economicimpactmillions = response.data.economicimpactmillions;
            $scope.affectedequipments = response.data.affectedequipments;
            $scope.overallpercentage = response.data.overallpercentage;
            $scope.status = JSON.stringify(response.status, null, 2);
            refreshFilters(countrySearch, from, to,attacktypeSearch, mineco, maxeco, minaff, maxaff, minove, maxove);
            anadirAlerta();
        }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            anadirAlerta();
        });
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
        
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
                $scope.alerts.push({ msg: "Error 409: No puede haber datos si quiere cargar los datos iniciales" });
            }
            else {
                anadirAlerta();
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
            refresh();
            anadirAlerta();
        },function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
            if ($scope.status == 409) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error 409: Ya existe este recurso" });
            }
            else if ($scope.status == 400) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error 400: Datos insuficientes" });
            }
            else {
                anadirAlerta();
            }
        });
    };
      
    $scope.putTable = function(country,year,attacktype,economicimpactmillions,affectedequipments,overallpercentage) {
        $http.put($scope.url + "/" + country + "/" + year+"/"+attacktype , {
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
                $scope.alerts.push({ msg: "Error 400: Datos insuficientes" });
            }
            else {
                anadirAlerta();
            }
        });
    };
        

}]);