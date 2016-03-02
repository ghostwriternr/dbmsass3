var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('administratorCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log('Hello World from administratorCtrl');

    $scope.init=function(){
        $scope.studentList = [];
        $scope.courseList = [];
        $scope.facultyList = [];
        $scope.parentList = [];

        $http.post('/student/getDetails', {}).success(function(response) {
            $scope.studentList = response;
        })
        $http.post('/course/getDetails', {}).success(function(response) {
            $scope.courseList = response;
        })
        $http.post('/faculty/getDetails', {}).success(function(response) {
            $scope.facultyList = response;
        })
        $http.post('/parent/getDetails', {}).success(function(response) {
            $scope.parentList = response;
        })
    }

    $scope.goToStudent=function(student){
        $window.location.href="/student.html"+"?email="+student.email+"?type=student";
    }

    $scope.goToFaculty=function(faculty){
        $window.location.href="/faculty.html"+"?email="+faculty.email+"?type=faculty";
    }

    $scope.goToParent=function(parent){
        $window.location.href="/parent.html"+"?email="+parent.email+"?type=parent";
    }

    $scope.logout=function(){
        $window.location.href="/index.html";
    }
}])
