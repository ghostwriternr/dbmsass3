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
            $scope.facultyName=response[0].name;
            $scope.facultyEmail=response[0].email;
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
                $window.location.href=$location.absUrl();
            })
        } else {
            console.log('LOLXD');
        }
    }

    $scope.setContact = function() {
        $http.post('/faculty/updateDetails/' + $scope.faculty.email, { 'contactInfo': $scope.facultyContactInfo }).success(function(response) {
            console.log(response[0]);
            $window.location.href=$location.absUrl();
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

    $scope.logout=function(){
        $window.location.href="/index.html";
    }

    $scope.replyMessage = function(index) {
        var messageSender;
        console.log("index = " + index);
        $scope.messageSender=index;
        $('#notificationLink').trigger("click");
        $('#messageModal').modal('show');
    }

    $scope.sendMessage=function(){
        console.log("Click on sendMessage");
        console.log($scope.messageToSend);
        console.log($scope.messageNotifications[$scope.messageSender].fromEmail);
        console.log($scope.facultyEmail);
        console.log($scope.facultyName);
        console.log($scope.messageNotifications[$scope.messageSender].courseName);
        var notification={
            'email':$scope.messageNotifications[$scope.messageSender].fromEmail,
            'message':$scope.messageToSend,
            'type':'message',
            'from':$scope.facultyName,
            'fromEmail':$scope.facultyEmail,
            'number':'0',
            'courseName':$scope.messageNotifications[$scope.messageSender].courseName
        }
        var display=function(){
            console.log(notification);
            $http.post('/notification/student',notification).success(function(response){
                console.log(response[0]);
            })
        }
        display();
    }
}])
