
    var app = angular.module('modone', []);
    app.controller("BlueprintController",function ($scope, $http){
		$scope.blunames=[];
		$scope.blupoints=[];
		$scope.bname="";		
		
		$scope.loadData = function() {
			
  		  	var configList = {
        	method: "GET",
        	url: "blueprints"
    	};
		
		
    		var response=$http(configList);

    		response.success(function(data, status, headers, config) {
				$scope.blunames = data;
	    	});
	   		response.error(function(data, status, headers, config) {
	        	alert("The petition has failed. HTTP Status:"+status);
    		});
		};
		
		
		$scope.loadShape = function (){
			var configList = {
				method: "GET",
				url: "blueprints/"+$scope.bname	
			};
			
			var response = $http(configList);
			var cnv = document.getElementById("drawing");
			var ctx = cnv.getContext("2d");
			
			response.success (function(data,status,headers,config){
				alert("EEXITO");
				$scope.blupoints=data.points;
                                //for (var i=0; i<$scope.blupoints.length;i++){
                                alert("blueprints/"+$scope.bname);
                                    ctx.moveTo($scope.blupoints[0].getX(),$scope.blupoints[0].getY());
                                    ctx.lineTo($scope.blupoints[1].getX(),$scope.blupoints[1].getY());
                                            
                                //}
				
			});
			
			response.error(function(data,status,headers,config){
				alert("FAAAIL");
			});
			
		};
	
});