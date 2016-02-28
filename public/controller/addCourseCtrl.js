var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('addCourseCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    $scope.courseList = [];
    $scope.facultyList = [];
    $http.post('/course/getDetails', {}).success(function(response) {
        var reply = response;
        $scope.courseList = response;
        console.log(response[0]);
    });
    $http.post('/faculty/getDetails', {}).success(function(response) {
        var reply = response;
        $scope.facultyList = response;
        console.log(response[0]);
    })
    $scope.x = '';
    $scope.coursePreList = [];
    $scope.facultyCourseList = [];
    $scope.y = '';
    $scope.setPreReq = function(courseName, $index, x) {
        console.log(courseName);
        $scope.coursePreList.push({ 'name': courseName });
    };

    $scope.setFaculty = function(facultyEmail, facultyName, $index, x) {
        console.log(facultyEmail);
        $scope.facultyCourseList.push({ 'email': facultyEmail, 'name': facultyName });
    };

    $scope.addCourse = function() {
        //update course
        //update courseTaught
        //update coursePrerequisites
        console.log('Finally here');
        console.log($scope.courseName);
        console.log($scope.courseDepartment);
        console.log($scope.startDate);
        console.log($scope.endDate);
        console.log($scope.facultyCourseList);
        console.log($scope.coursePreList);
        console.log($scope.courseDescription);
        var course = {};
        var courseTaught = {};
        var coursePrerequisites = {};
        var fill = function() {
            course.name = $scope.courseName;
            course.description = $scope.courseDescription;
            course.lectures = "0";
            course.assignment = "0";
            course.endDate = $scope.endDate;
            course.startDate = $scope.startDate;
            course.departmentName = $scope.courseDepartment;
            var addCourse = function() {
                console.log(course);
                $http.post('/course/AddCourse', course).success(function(response) {
                    console.log(response[0]);
                })
            }
            addCourse();
            var addCourseTaught = function() {
                for (var index = 0; index < $scope.facultyCourseList.length; index++) {
                    var addInstance = function() {
                        courseTaught.courseName = $scope.courseName;
                        courseTaught.facultyName = $scope.facultyCourseList[index].name;
                        courseTaught.facultyEmail = $scope.facultyCourseList[index].email;
                        var addThis = function(courseTaught_) {
                            console.log(courseTaught_);
                            $http.post('/courseTaught/addEntry', { 'courseName': $scope.courseName, 'facultyName': $scope.facultyCourseList[index].name, 'facultyEmail': $scope.facultyCourseList[index].email }).success(function(response) {
                                console.log(response);
                            })
                        }
                        addThis(courseTaught);
                    }
                    addInstance();
                }
            }
            addCourseTaught();
            var addPrerequisites = function() {
                coursePrerequisites.courseName = $scope.courseName;
                coursePrerequisites.courseList = $scope.coursePreList;
                var addThis = function() {
                    console.log(coursePrerequisites);
                    $http.post('/coursePrerequisites/addEntry', coursePrerequisites).success(function(response) {
                        console.log(response[0]);
                    })
                }
                addThis();
            }
            addPrerequisites();
            var addStudentCourse = function() {
                $http.post('/studentCourse/addEntry', { 'courseName': $scope.courseName, 'studentEmail': [] }).success(function(response) {
                    console.log(response[0]);
                })
            }
            addStudentCourse();
        }
        fill();
    }
}]);
