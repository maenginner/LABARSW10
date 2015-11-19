
    var app = angular.module('modone', []);
    app.controller("BlueprintController",function ($scope, $log, $http){
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
				$scope.blupoints=data.points;				
				ctx.moveTo($scope.blupoints[0].x,$scope.blupoints[0].y);
                                for (var i=1; i<$scope.blupoints.length;i++){
                                        $log.debug($scope.blupoints[i]);
                                        ctx.lineTo($scope.blupoints[i].x,$scope.blupoints[i].y);
                                }
                                ctx.stroke();
			});
			
			response.error(function(data,status,headers,config){
				alert("EPIC FAIL!");
			});
			
		};
		
		$scope.loadSvg=function(){
		        var configList = {
				method: "GET",
				url: "blueprints/"+$scope.bname	
			};
			
			var response = $http(configList);
			
			response.success (function(data,status,headers,config){
			       
				$scope.blupoints=data.points;				
				var svg=document.getElementById("svgd");
				for (var i=0; i<$scope.blupoints.length-1;i++){
				        line= document.createElementNS("http://www.w3.org/2000/svg","line");
        				line.setAttribute('x1',$scope.blupoints[i].x);
	        			line.setAttribute('y1',$scope.blupoints[i].y);
	        			line.setAttribute('x2',$scope.blupoints[i+1].x);
	        			line.setAttribute('y2',$scope.blupoints[i+1].y);
	        			line.setAttribute('style',"stroke:rgb(255,0,0);stroke-width:2" );
	        			svg.appendChild(line);  
				}
				
			});
			
			response.error(function(data,status,headers,config){
				alert("EPIC FAIL!");
			});
		};
	
});
