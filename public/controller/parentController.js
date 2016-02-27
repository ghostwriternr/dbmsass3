var myApp=angular.module('myApp',['ngRoute']);
myApp.controller('parentCtrl',['$scope','$http','$window','$log','$location',function($scope,$http,$window,$log,$location){
	console.log('Hello World from parentCtrl');

	$scope.init=function(){
		var urlLogin=$location.absUrl();
		var query={};
		var output=urlLogin.substr(urlLogin.lastIndexOf('=')+1);
		console.log(output);
		query={'email':output};
		$http.post('/parent/getDetails',query).success(function(response){
			console.log(response);
			$scope.parent=response[0];
			console.log(response[0]);
		})
		$http.post('/parent/getChildList',{'parentEmail':output}).success(function(response){
			$scope.parentChildList=response;
			$scope.parentChildNumber=response.length;
		})
	}

	$scope.viewProfile=function(child){
		console.log(child);
		$window.open('/student.html'+"?email="+child.childEmail);
	}

	$scope.addChild=function(childEmailRequest){
		console.log(childEmailRequest);
		var request={};
		var fill=function(){
			request.parentName=$scope.parent.name;
			request.parentEmail=$scope.parent.email;
			request.childEmail=childEmailRequest;
			var sendRequest=function(){
				$http.post('/parent/sendRequest',request).success(function(response){
					console.log(response[0]);
				})
			}
			sendRequest();
		}
		fill();
	}
}])