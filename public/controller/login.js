var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$log','$location','$window','$http',function($scope,$http,$log,$window){
	console.log("Hello Wrold from controller");

// var refresh=function(){
// 	$http.get('/contactlist').success(function(response){
// 		console.log("Data recieved");
// 		$scope.contactlist=response;
// 		$scope.contact="";
// 	});
// };

//refresh();

$scope.studentLogin=function(){
	console.log("hi there");
	var url="/student.html";
	$window.location.href=url;
}

// $scope.addContact=function(){
// 	console.log($scope.contact)
// 	$http.post('/contactlist',$scope.contact).success(function(response){
// 		console.log(response);
// 		refresh();
// 	});
// };

// $scope.remove=function(id){
// 	console.log(id);
// 	$http.delete('/contactlist/'+id).success(function(response){
// 		console.log(response);
// 		refresh();
// 	});
// };

// $scope.edit=function(id){
// 	console.log(id);
// 	$http.get('/contactlist/'+id).success(function(response){
// 		console.log(response);
// 		$scope.contact=response;
// 	});
// };

// $scope.update=function(){
// 	console.log($scope.contact._id);
// 	var id=$scope.contact._id;
// 	$http.put('/contactlist/'+id,$scope.contact);
// }

}])