    
    /*global angular $scope*/
    
    var app = angular.module("PostmanApp");
  
    app.controller("MainCtrl",["$scope","$http", function ($scope,$http) {
        
        console.log("MainCtrl initialized");
        
        $scope.url = "/api/v1/computers-attacks-stats";
        
        $scope.get = function(){
           
            $http.get($scope.url).then( function(response){
             
                $scope.data=JSON.stringify(response.data,null,2);
                $scope.status = JSON.stringify(response.status,null,2);
          
            }
                );
        };
        
        $scope.loadinitial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.status = JSON.stringify(response.status, null, 2);
        }, function(response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
      });
    };
       
        $scope.del = function(){
           
            $http.delete($scope.url).then(function(response){
                $scope.data = JSON.stringify(response.data,null,2);
                $scope.status=JSON.stringify(response.stats,null,2);
                
          
            } , function (response){
               
                $scope.data=response.data || "Request failed";
                $scope.status = response.status
           
            });
        };
      
        
        $scope.post = function() { 
            
            $http.post(
                $scope.url,{
                    country : $scope.country,
                    year : parseInt($scope.year),
                    attacktype: $scope.attacktype,
                    economicimpactmillions: parseFloat($scope.economicimpactmillions),
                    affectedequipments:  parseInt($scope.affectedequipments),
                    overallpercentage: parseFloat($scope.overallpercentage)
            
                }).then(function(response){
                  
                    $scope.data= JSON.stringify(response.data,null,2);
                    $scope.status=JSON.stringify(response.status,null,2);
              
                },function(response){// esta segunda funcónes para que muestre los fallos si se dan .
               
                $scope.data=response.data || "Request failed";
                $scope.status=response.status;
               
                });
        };
            
        
        $scope.put = function(){
            
            $http.put($scope.url,{
                 country : $scope.country,
                    year : parseInt($scope.year),
                    attacktype: $scope.attacktype,
                    economicimpactmillions: parseFloat($scope.economicimpactmillions),
                    affectedequipments:  parseInt($scope.affectedequipments),
                    overallpercentage: parseFloat($scope.overallpercentage)
            
            }).them(function(response){
                
                $scope.data = JSON.stringify(response.data,null,2);
                $scope.status = JSON.stringify(response.status,null,2);
                
            } , function(response){
                $scope.data= response.data || "Request failed";
                $scope.status= response.status;
            });
            
        };
        
        
        
        
        
        
    }]);