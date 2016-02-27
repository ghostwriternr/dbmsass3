var myApp=angular.module('myApp',['ngRoute']);
myApp.controller('facultyCtrl',['$scope','$http','$window','$log','$location',function($scope,$http,$window,$log,$location){
	console.log('Hello World from facultyCtrl');

	$scope.init=function(){
		console.log($location.absUrl());
		var res=$location.absUrl().split('?');
		var tempData=res[1].split('=');
		var userEmail=tempData[1];
		console.log(userEmail);
		var faculty={};
		$http.post('/faculty/getDetails',{'email':userEmail}).success(function(response){
			var reply=response[0];
			$scope.facultyName=reply.name;
			$scope.facultyEmail=reply.email;
		})
		$http.post('/courseTaught/getCourses',{'facultyEmail':userEmail}).success(function(response){
			var reply=response;
			$scope.courseList=reply;
		})
	}

	$scope.goToCourse=function(email,courseName){
		console.log("here->"+email+" "+courseName);
		$window.open("/viewcourse_faculty.html"+"?email="+email+"?course="+courseName);
	}

	$scope.addNewCourse=function(email){
		$window.open("/add_course.html"+"?email="+email);
	}

	$scope.goToProfile=function(){
		$window.open("/profile.html"+"?email="+$scope.facultyEmail);
	}
}])