var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log("Hello Wrold from controller");

    $scope.studentLogin = function() {
        var type = $scope.person.type;
        $scope.authSuccess=-1;
        if (type == 1) {
            var student = { 'email': $scope.person.email, 'password': $scope.person.password };
            console.log(student);
            $http.post('/student/login', student).success(function(response) {
                if (response == 1) {
                    $scope.authSuccess=1;
                    var url = "/student.html";
                    console.log("Authentication successful");
                    $window.location.href = url + "?email=" + $scope.person.email+"?type=student";
                    console.log("Authnetication successfull");
                } else {
                    $scope.authSuccess=0;
                    console.log("Authentication failed");
                }
            })
        } else if (type == 2) {
            var faculty = { 'email': $scope.person.email, 'password': $scope.person.password };
            console.log(faculty);
            $http.post('/faculty/login', faculty).success(function(response) {
                if (response == 1) {
                    $scope.authSuccess=1;
                    console.log("Authnetication success");
                    var url = "/faculty.html";
                    console.log("Authentication successful");
                    $window.location.href = url + "?email=" + $scope.person.email+"?type=faculty";
                    console.log("Authnetication successfull");
                } else {
                    $scope.authSuccess=0;
                    console.log("Authentication failed");
                }
            })
        } else if (type == 3) {
            var parent = { 'email': $scope.person.email, 'password': $scope.person.password };
            console.log(parent);
            $http.post('/parent/login', parent).success(function(response) {
                if (response == 1) {
                    $scope.authSuccess=1;
                    var url = "/parent.html";
                    console.log("Authentication successful");
                    $window.location.href = url + "?email=" + $scope.person.email+"?type=parent";
                    console.log("Authnetication successfull");
                } else {
                    $scope.authSuccess=0;
                    console.log("Authentication failed");
                }
            })
        } else if (type == 4) {
            var admin = { 'email': $scope.person.email, 'password': $scope.person.password };
            console.log(admin);
            $http.post('/admin/login', admin).success(function(response) {
                if (response == 1) {
                    $scope.authSuccess=1;
                    var url = "/administrator.html"+"?type=administrator";
                    console.log("Authentication successful");
                    $window.location.href = url;
                    console.log("Authnetication successfull");
                } else {
                    $scope.authSuccess=0;
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

myApp.controller('getType', ['$scope', '$log', '$location', '$window', '$http', function($scope, $http, $log, $window) {
    console.log("Hello Wrold from setType");

    $scope.setType = function(type) {
        $scope.person.type = type;
    }
}])

myApp.controller('getTypeRegister', ['$scope', '$log', '$location', '$window', '$http', function($scope, $http, $log, $window) {
    console.log("Hello Wrold from setType");

    $scope.setType = function(type) {
        $scope.personR.type = type;
    }
}])

myApp.controller('personRegister', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $log, $window) {
    console.log("Hello Wrold from personRegister");

    $scope.registerPerson = function(type) {
        console.log($scope.personR);
        console.log('hereh');
        $scope.authSuccess=-1;
        var type = $scope.personR.type;
        if (type == 1) {
            var student = { 'email': $scope.personR.email };
            $http.post('/student/login', student).success(function(response) {
                if (response == 0 && $scope.personR.pass==$scope.personR.repass) {
                    console.log('here');
                    $scope.authSuccess=1;
                    student = { 'name': $scope.personR.fName + ' ' + $scope.personR.lName, 'email': $scope.personR.email, 'password': $scope.personR.pass, 'contactInfo': '123' };
                    $http.post('/student/register', student).success(function(reply) {
                        console.log(reply);
                    })
                    $http.post('/studentCourseReg/addEntry', { 'email': $scope.personR.email, 'course': [] }).success(function(response) {
                        console.log(response);
                    })
                } else if (response >= 1) {
                    $scope.authSuccess=0;
                    console.log('A person with that email-id already exists');
                }
            })
        } else if (type == 2) {
            var faculty = { 'email': $scope.personR.email };
            $http.post('/faculty/login', faculty).success(function(response) {
                if (response == 0 && $scope.personR.pass==$scope.personR.repass) {
                    console.log('here');
                    $scope.authSuccess=1;
                    faculty = { 'name': $scope.personR.fName + ' ' + $scope.personR.lName, 'email': $scope.personR.email, 'password': $scope.personR.pass, 'contactInfo': '123' };
                    $http.post('/faculty/register', faculty).success(function(response) {
                        console.log(response);
                    })
                } else if (response >= 1) {
                    $scope.authSuccess=0;
                    console.log('A person with that email-id already exists');
                }
            })
        } else if (type == 3) {
            var parent = { 'email': $scope.personR.email };
            $http.post('/parent/login', parent).success(function(response) {
                if (response == 0 && $scope.personR.pass==$scope.personR.repass) {
                    console.log('here');
                    $scope.authSuccess=1;
                    parent = { 'name': $scope.personR.fName + ' ' + $scope.personR.lName, 'email': $scope.personR.email, 'password': $scope.personR.pass, 'contactInfo': '123' };
                    $http.post('/parent/register', faculty).success(function(response) {
                        console.log(response);
                    })
                } else if (response >= 1) {
                    $scope.authSuccess=0;
                    console.log('A person with that email-id already exists');
                }
            })
        } else if (type == 4) {
            var admin = { 'email': $scope.personR.email };
            $http.post('/admin/login', admin).success(function(response) {
                if (response == 0 && $scope.personR.pass==$scope.personR.repass) {
                    console.log('here');
                    $scope.authSuccess=1;
                    admin = { 'name': $scope.personR.fName + ' ' + $scope.personR.lName, 'email': $scope.personR.email, 'password': $scope.personR.pass, 'contactInfo': '123' };
                    $http.post('/admin/register', faculty).success(function(response) {
                        console.log(response);
                    })
                } else if (response >= 1) {
                    $scope.authSuccess=0;
                    console.log('A person with that email-id already exists');
                }
            })
        }
    }
}]);
