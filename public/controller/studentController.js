var myApp=angular.module('myApp',['ngRoute']);
myApp.controller('studentCtrl',['$scope','$http','$window','$log','$location',function($scope,$http,$window,$log,$location){
	console.log("Hello World from login studentController_new");
	$scope.goToCourse=function(email,courseName){
		console.log($scope.studentName);
		$window.open("/view_course.html"+"?email="+email);
	}
	$scope.goToCourse=function(email,courseName){
		console.log($scope.studentName);
		$window.open("/view_course.html"+"?email="+email+"?course="+courseName);
	}
	$scope.init=function(){
		console.log("check if this works");
		var urlLogin=$location.absUrl();
		var student={};
		var query={};
		var output=urlLogin.substr(urlLogin.lastIndexOf('=')+1);
		console.log(output);
		query={'email':output};
		$http.post('/student/getDetails',query).success(function(response){
			var student=response;
			console.log(response[0]);
			$scope.studentName=student[0].name;
			$scope.studentEmail=student[0].email;
			console.log($scope.studentEmail);
		})

		//Filling in the content of course
		var courseStudent=[];
		$http.post('/studentCourse/getContent',query).success(function(response){
			var reply=response;
			var courseStudentContent={}
			for(var i=0;i<reply[0].course.length;i++){
				var queryCourse={'name':reply[0].course[i].courseName};
				console.log(queryCourse);
				var trytofill=function(courseinfo){
					$http.post('/course/getDetails',{'name':courseinfo.courseName}).success(function(response){
					var replyC=response[0];
					console.log(response[0].name);
					var fillin=function(replyC){
						courseStudentContent={'courseName':courseinfo.courseName,'completedAssignments':courseinfo.assignmentCompleted,'completedLectures':courseinfo.lecturesCompleted,
							'courseAssignment':replyC.assignment,'courseLectures':replyC.lectures};
						courseStudent.push(courseStudentContent);
					}
					fillin(replyC);
					console.log(courseStudentContent);
					});
				}
				trytofill(reply[0].course[i],queryCourse);
			}
			$scope.courseStudent=courseStudent;
		})
	}
	//Fill the contents of the course

}]);
