var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('profileParentCtrl', ['$scope', '$http', '$window', '$log', '$location','$filter', function($scope, $http, $window, $log, $location,$filter) {
	$scope.init=function(){
        var urlLogin = $location.absUrl();
        var res = $location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        $scope.parentEmail=tempData[1];
        var output=userEmail;
        tempData=res[2].split('=');
        $scope.personType="parent";
        console.log(output);
        query = { 'email': output };
        $http.post('/parent/getDetails', query).success(function(response) {
            console.log(response);
            $scope.parent = response[0];
            console.log(response[0]);
        })
	}

	$scope.logout=function(){
		$window.location.href="/index.html";
	}

	$scope.setPassword=function(){
		if($scope.parentOldPassword==$scope.parent.password && $scope.parentNewPassword==$scope.parentNewPasswordC){
			$http.post('/parent/updateDetails/'+$scope.parentEmail,{'password':$scope.parentNewPassword}).success(function(response){
				console.log(response[0]);
				$window.location.href=$location.absUrl();
			})
		}
	}

	$scope.setContact=function(){
		$http.post('/parent/updateDetails/'+$scope.parentEmail,{'contactInfo':$scope.parentContactInfo}).success(function(response){
			console.log(response[0]);
			$window.location.href=$location.absUrl();
		})
	}
}])