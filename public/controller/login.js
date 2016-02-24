var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http','$window','$log','$location',function($scope,$http,$window,$log,$location){
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
	var type=$scope.person.type;
	if(type==1){
		var student={'email':$scope.person.email,'password':$scope.person.password};
		console.log(student);
		$http.post('/student/login',student).success(function(response){
			if(response==1){
				var url="/student.html";
				console.log("Authentication successful");
				$window.location.href=url;
				console.log("Authnetication successfull");
			}
			else{
				console.log("Authentication failed");
			}
		})
	}
	else if(type==2){
		var faculty={'email':$scope.person.email,'password':$scope.person.password};
		console.log(faculty);
		$http.post('/faculty/login',faculty).success(function(response){
			if(response==1){
				console.log("Authnetication success");
				var url="/student.html";
				console.log("Authentication successful");
				$window.location.href=url;
				console.log("Authnetication successfull");
			}
			else{
				console.log("Authentication failed");
			}
		})
	}
	else if(type==3){
		var parent={'email':$scope.person.email,'password':$scope.person.password};
		console.log(parent);
		$http.post('/parent/login',parent).success(function(response){
			if(response==1){
				var url="/parent.html";
				console.log("Authentication successful");
				$window.location.href=url;
				console.log("Authnetication successfull");
			}
			else{
				console.log("Authentication failed");
			}
		})
	}
	else if(type==4){
		var admin={'email':$scope.person.email,'password':$scope.person.password};
		console.log(admin);
		$http.post('/admin/login',admin).success(function(response){
			if(response==1){
				var url="/admin.html";
				console.log("Authentication successful");
				$window.location.href=url;
				console.log("Authnetication successfull");
			}
			else{
				console.log("Authentication failed");
			}
		})
	}
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

myApp.controller('getType',['$scope','$log','$location','$window','$http',function($scope,$http,$log,$window){
	console.log("Hello Wrold from setType");

$scope.setType=function(type){
	$scope.person.type=type;
}
}])