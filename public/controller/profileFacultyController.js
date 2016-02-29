var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('profileFacultyCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log('Hello World from profileFacultyCtrl');

    $scope.init = function() {
        var urlLogin = $location.absUrl();
        var faculty = {};
        var query = {};
        //
        var res = $location.absUrl().split('?');
        $scope.locationRes=$location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        var output=tempData[1];
        tempData=res[2].split('=');
        $scope.userType=tempData[1];
        //
        //var output = tempData[1];
        console.log(output);
        query = { 'email': output };

        $http.post('/faculty/getDetails', query).success(function(response) {
            faculty = response[0];
            $scope.faculty = response[0];
            $scope.facultyPassword = response[0].password;
            console.log(response[0]);
        })

        $scope.lectureNotifications = [];
        $scope.assignmentNotifications = [];
        $scope.messageNotifications = [];

        var fillNotifications = function() {
            $http.post('/notification/getDetails', query).success(function(response) {
                console.log(response);
                $scope.notificationCount = response.length;
                var fill = function() {
                    for (var index = 0; index < response.length; index++) {
                        console.log(response[index]);
                        if (response[index].type == 'message') {
                            $scope.messageNotifications.push(response[index]);
                        } else if (response[index].type == 'lecture') {
                            $scope.lectureNotifications.push(response[index]);
                        } else if (response[index].type == 'assignment') {
                            $scope.assignmentNotifications.push(response[index]);
                        }
                    }
                }
                fill();
            })
        }
        fillNotifications();
    }

    $scope.setPassword = function() {
        if ($scope.facultyOldPassword == $scope.facultyPassword && $scope.facultyNewPassword == $scope.facultyNewPasswordC) {
            console.log($scope.facultyOldPassword + " " + $scope.facultyNewPassword + " " + $scope.facultyNewPasswordC);
            $http.post('/faculty/updateDetails/' + $scope.faculty.email, { 'password': $scope.facultyNewPassword }).success(function(response) {
                console.log(response[0]);
            })
        } else {
            console.log('LOLXD');
        }
    }

    $scope.setContact = function() {
        $http.post('/faculty/updateDetails/' + $scope.faculty.email, { 'contactInfo': $scope.facultyContactInfo }).success(function(response) {
            console.log(response[0]);
        })
    }

    $scope.goToProfile=function(){
        if($scope.userType=='faculty'){
            $window.location.href="/faculty.html"+"?email="+$scope.faculty.email+"?type=faculty";
        }
        else if($scope.userType=='parent'){
            //qwe
        }
    }
}])
