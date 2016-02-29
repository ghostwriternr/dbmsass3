var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('lectureCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log('Hello World from lectureCtrl');

    $scope.init = function() {
        console.log($location.absUrl());
        $scope.locationRes=$location.absUrl().split('?');
        var res = $location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        $scope.studentEmail = tempData[1];
        tempData = res[2].split('=');
        var courseName = tempData[1];
        $scope.courseName = tempData[1];
        tempData = res[3].split('=');
        var lectureNumber = tempData[1];
        $scope.lectureCurrentNumber=tempData[1];
        var student = {};
        var course = {};
        var lecture = {};
        $http.post('/student/getDetails', { 'email': userEmail }).success(function(response) {
            var reply = response[0];
            $scope.student = reply;
            console.log($scope.student);
        })
        $http.post('/course/getDetails', { 'name': courseName }).success(function(response) {
            var reply = response[0];
            $scope.course = reply;
            console.log($scope.course);
        })
        $http.post('/lecture/getDetails', { 'courseName': courseName, 'lectureNumber': lectureNumber }).success(function(response) {
            var reply = response[0];
            $scope.lecture = reply;
            console.log($scope.lecture);
        })
    }

    $scope.doneWithLecture = function(studentEmail, courseName) {
        if($scope.locationRes.length==4){
            $http.post('/studentCourse/getContent', { 'email': studentEmail }).success(function(response) {
                console.log(response[0]);
                var addCount = function() {
                    for (var index = 0; index < response[0].course.length; index++) {
                        console.log(response[0].course[index]);
                        var check = function() {
                            if (response[0].course[index].courseName == courseName && parseInt(response[0].course[index].lecturesCompleted)+1==parseInt($scope.lectureCurrentNumber) && $scope.locationRes.length==4) {
                                console.log(response[0].course[index].courseName);
                                response[0].course[index].lecturesCompleted = (parseInt(response[0].course[index].lecturesCompleted) + 1) + "";
                                var update = function() {
                                    console.log(response[0]);
                                    $http.post('/studentCourse/updateContent/' + studentEmail, response[0]).success(function(response) {
                                        var reply = response[0];
                                        console.log(response[0]);
                                    })
                                }
                                update();
                            }
                        }
                        check();
                    }
                }
                addCount();
            })
        }
    }

    $scope.goToProfile=function(){
        if($scope.locationRes.length==5){
            var res=$scope.locationRes[4].split('=');
            var check=function(){
                if(res[1]=='faculty'){
                    $window.location.href="/faculty.html"+"?email="+$scope.studentEmail+"?type=faculty";
                }
            }
            check();
            //$window.location.href="/student.html"+"?email="+$scope.studentEmail;
        }
        else{
            console.log($scope.locationRes.length);
            $window.location.href="/student.html"+"?email="+$scope.studentEmail;
        }
    }
}])
