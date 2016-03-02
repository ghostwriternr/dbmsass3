var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('studentCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log('Hello World from studentCtrl');

    $scope.init = function() {
        var urlLogin = $location.absUrl();
        var student = {};
        var query = {};
        var res = $location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        var output=tempData[1];
        console.log(output);
        query = { 'email': output };
        $http.post('/student/getDetails', query).success(function(response) {
            var student = response;
            console.log(response[0]);
            $scope.studentName = student[0].name;
            $scope.studentEmail = student[0].email;
            $scope.studentPassword = response[0].password;
            $scope.studentContactInfo = response[0].contactInfo;
            console.log($scope.studentEmail + " " + response[0].password);
        })
        $http.post('/parentChild/getDetails', { 'childEmail': output }).success(function(response) {
            $scope.parentRequestList = response;
        })
    }

    $scope.showRequest = function(parent) {
        $scope.selectedParent = parent;
    }

    $scope.reject = function(parent) {
        $http.post('/parentChild/deleteRequest', { 'parentName': parent.parentName, 'parentEmail': parent.parentEmail, 'childEmail': parent.childEmail }).success(function(response) {
            console.log(response[0]);
        })
    }

    $scope.confirm = function(parent) {
        console.log(parent);
        $http.post('/parentChild/deleteRequest', { 'parentName': parent.parentName, 'parentEmail': parent.parentEmail, 'childEmail': parent.childEmail }).success(function(response) {
            console.log(response[0]);
        })
        $http.post('/parentChild/addEntry', { 'parentName': parent.parentName, 'parentEmail': parent.parentEmail, 'childEmail': $scope.studentEmail, 'childName': $scope.studentName }).success(function(response) {
            console.log(response[0]);
        })
    }

    $scope.setPassword = function() {
        if ($scope.studentOldPassword == $scope.studentPassword && $scope.studentNewPassword == $scope.studentNewPasswordC) {
            console.log($scope.studentOldPassword + " " + $scope.studentNewPassword + " " + $scope.studentNewPasswordC);
            $http.post('/student/updateDetails/' + $scope.studentEmail, { 'password': $scope.studentNewPassword }).success(function(response) {
                console.log(response[0]);
                $window.location.href=$location.absUrl();
            })
        }
    }

    $scope.setContact = function() {
        $http.post('/student/updateDetails/' + $scope.studentEmail, { 'contactInfo': $scope.studentNewContact }).success(function(response) {
            console.log(response[0]);
            $window.location.href=$location.absUrl();
        })
    }

    $scope.goToHome=function(){
        console.log('Go to HOME');
        $window.location.href="/student.html"+"?email="+$scope.studentEmail+"?type=student";
    }

    $scope.logout=function(){
        $window.location.href="/index.html";
    }
}])
