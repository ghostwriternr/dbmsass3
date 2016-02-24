var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Hello World from login studentController");

$scope.studentLogin=function(){
	//console.log($scope.person);
	console.log("trying to login-")
	$http.post('/student/login',$scope.person).success(function(response){
		var studentAuthenticationStatus=response;
		if(studentAuthenticationStatus==1){
			console.log('Correct credentials');
		}
		else{
			console.log('Incorrect credentials');
		}
		//$scope.person=response;
	});
};


}])