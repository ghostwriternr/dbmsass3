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
        $http.post('/faculty/getDetails', { 'email': userEmail }).success(function(response) {
            var reply = response[0];
            $scope.facultyName = reply.name;
            $scope.facultyEmail = reply.email;
        })
        $http.post('/courseTaught/getCourses', { 'facultyEmail': userEmail }).success(function(response) {
            var reply = response;
            $scope.courseList = reply;
        })
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
}])
