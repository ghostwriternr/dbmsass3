var myApp=angular.module('myApp',['ngRoute']);
myApp.controller('studentCtrl',['$scope','$http','$window','$log','$location',function($scope,$http,$window,$log,$location){
	console.log("Hello World from login studentController_new");
	var urlLogin=$location.absUrl();
	var output=urlLogin.substr(urlLogin.lastIndexOf('=')+1);
	console.log(output);
	this.name=output;

	this.getName = function(){
		console.log("qwe");
		return this.name;
	};
}])