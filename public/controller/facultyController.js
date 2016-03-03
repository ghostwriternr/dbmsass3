var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('facultyCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log('Hello World from facultyCtrl');

    $scope.init = function() {
        console.log($location.absUrl());
        var res = $location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        console.log(userEmail);
        tempData=res[2].split('=');
        $scope.personType=tempData[1];
        var faculty = {};
        var query={'email':res[1].split('=')[1]};
        $http.post('/faculty/getDetails', { 'email': userEmail }).success(function(response) {
            var reply = response[0];
            $scope.facultyName = reply.name;
            $scope.facultyEmail = reply.email;
        })
        $http.post('/courseTaught/getCourses', { 'facultyEmail': userEmail }).success(function(response) {
            var reply = response;
            $scope.courseList = reply;
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

    $scope.goToCourse = function(email, courseName) {
        console.log("here->" + email + " " + courseName);
        $window.location.href=("/viewcourse_faculty.html" + "?email=" + email + "?course=" + courseName+"?type=faculty");
    }

    $scope.addNewCourse = function(email) {
        $window.location.href=("/add_course.html" + "?email=" + email+"?type=faculty");
    }

    $scope.goToProfile = function() {
        $window.location.href=("/profile.html" + "?email=" + $scope.facultyEmail+"?type=faculty");
    }

    $scope.goToHome = function() {
        $window.location.href = $location.absUrl();
    }

    $scope.logout=function(){
        $window.location.href=("/index.html");
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
            var socket=io.connect('http://localhost:3007');
            socket.emit('notificationRecieve',{'data':'Notification Sent'});
        }
        display();
    }
}])
