var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('addCourseCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    $scope.courseList = [];
    $http.post('/course/getDetails', {}).success(function(response) {
        var reply = response;
        $scope.courseList = response;
        console.log(response[0]);
    });
    $scope.x = '';
    $scope.coursePreList = [];
    $scope.setPreReq = function(courseName, $index, x) {
        console.log(courseName);
        $scope.coursePreList.push({'name':courseName});
    };
}]);
