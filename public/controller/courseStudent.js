var myApp=angular.module('myApp',['ngRoute']);
myApp.controller('cStudentCtrl',['$scope','$http','$window','$log','$location',function($scope,$http,$window,$log,$location){
	console.log("Hello World from studentCtrl");

	$scope.init=function(){
		console.log($location.absUrl());
		var res=$location.absUrl().split('?');
		var tempData=res[1].split('=');
		var userEmail=tempData[1];
		tempData=res[2].split('=');
		var courseName=tempData[1];
		console.log(userEmail+" "+courseName);
		$scope.courseName=courseName;
		$http.post('/student/getDetails',{'email':userEmail}).success(function(response){
			var reply=response[0];
			$scope.studentName=reply.name;
			$scope.studentEmail=userEmail;
		})
		$http.post('/courseInstructor/getDetails',{'courseName':courseName}).success(function(response){
			var reply=response;
			console.log(reply[0].facultyName);
			$scope.courseInstructor=reply;
		})
		$http.post('/course/getDetails',{'name':courseName}).success(function(response){
			var reply=response[0];
			$scope.startDate=reply.startDate;
			$scope.endDate=reply.endDate;
			$scope.courseDescription=reply.description;
		})
		$http.post('/lecture/getList',{'courseName':courseName}).success(function(response){
			$scope.lectureCourse=response;
			console.log('done');
		})
		$http.post('/assignment/getList',{'courseName':courseName}).success(function(response){
			$scope.assignmentCourse=response;
			console.log('done');
		})
	}

	$scope.goToLecture=function(email,course,lectureNum){
		$window.open('/lecture.html'+"?email="+email+"?course="+course+"?lectNum="+lectureNum);
	}

	$scope.goToAssignment=function(email,course,assignmentNum){
		$window.open('/assignment.html'+"?email="+email+"?course="+course+"?assignmentNum="+assignmentNum);
	}
}])