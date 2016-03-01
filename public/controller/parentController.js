var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('parentCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log('Hello World from parentCtrl');

    $scope.init = function() {
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
        $http.post('/parent/getChildList', { 'parentEmail': output }).success(function(response) {
            $scope.parentChildList = response;
            $scope.parentChildNumber = response.length;
        })
    }

    $scope.viewProfile = function(child) {
        console.log(child);
        $window.location.href=('/student.html' + "?email=" + child.childEmail+"?type=student"+"?type=parent");
    }

    $scope.goToProfile = function() {
            $window.open('/profile_parent.html' + "?email=" + $scope.parent.email+"?type=parent");
    }

    $scope.addChild = function(childEmailRequest) {
        console.log(childEmailRequest);
        var request = {};
        var fill = function() {
            request.parentName = $scope.parent.name;
            request.parentEmail = $scope.parent.email;
            request.childEmail = childEmailRequest;
            var sendRequest = function() {
                $http.post('/parent/sendRequest', request).success(function(response) {
                    console.log(response[0]);
                })
            }
            sendRequest();
        }
        fill();
    }

    $scope.logout=function(){
        $window.location.href="/index.html";
    }

    $scope.goToProfile=function(){
        $window.location.href="/profile_parent.html"+"?email="+$scope.parentEmail+"?type=parent";
    }
}])
