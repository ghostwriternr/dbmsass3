var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('studentCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log("Hello World from login studentController_new");
    $scope.goToCourse = function(email, courseName) {
        console.log($scope.studentName);
        $window.open("/view_course.html" + "?email=" + email);
    }
    $scope.goToCourse = function(email, courseName) {
        console.log($scope.studentName);
        $window.open("/view_course.html" + "?email=" + email + "?course=" + courseName);
    }
    $scope.init = function() {
        console.log("check if this works");
        var urlLogin = $location.absUrl();
        var student = {};
        var query = {};
        var output = urlLogin.substr(urlLogin.lastIndexOf('=') + 1);
        console.log(output);
        query = { 'email': output };
        $http.post('/student/getDetails', query).success(function(response) {
            var student = response;
            console.log(response[0]);
            $scope.studentName = student[0].name;
            $scope.studentEmail = student[0].email;
            console.log($scope.studentEmail);
        })

        //Filling in the content of course
        var courseStudent = [];
        var courseListName = [];
        var coursesNotRegistered = [];
        $scope.lectureNotifications = [];
        $scope.assignmentNotifications = [];
        $scope.messageNotifications = [];
        $http.post('/studentCourse/getContent', query).success(function(response) {
            if (response[0].course.length == 0) {
                console.log("hi there");
                $http.post('/course/getDetails', {}).success(function(response) {
                    var reply = response;
                    coursesNotRegistered = reply;
                    $scope.coursesNotRegistered = reply;
                    console.log("here->" + coursesNotRegistered[0].name);
                })
            } else {
                var reply = response;
                var courseStudentContent = {}
                for (var i = 0; i < response[0].course.length; i++) {
                    var queryCourse = { 'name': reply[0].course[i].courseName };
                    console.log(queryCourse);
                    var trytofill = function(courseinfo) {
                        $http.post('/course/getDetails', { 'name': courseinfo.courseName }).success(function(response) {
                            var replyC = response[0];
                            console.log(response[0].name);
                            var fillin = function(replyC) {
                                courseStudentContent = {
                                    'courseName': courseinfo.courseName,
                                    'completedAssignments': courseinfo.assignmentCompleted,
                                    'completedLectures': courseinfo.lecturesCompleted,
                                    'courseAssignment': replyC.assignment,
                                    'courseLectures': replyC.lectures
                                };
                                courseStudent.push(courseStudentContent);
                                courseListName.push(courseinfo.courseName);
                                var getNotReg = function(courseListName) {
                                    console.log(courseListName[0]);
                                    $http.post('/course/notInList', courseListName).success(function(response) {
                                        var reply = response;
                                        coursesNotRegistered = reply;
                                        $scope.coursesNotRegistered = reply;
                                        console.log("here->" + coursesNotRegistered[0].name);
                                    })
                                }
                                getNotReg(courseListName);
                                //console.log("courseList->"+courseListName[courseListName.length-1]);
                            }
                            fillin(replyC);
                            console.log(courseStudentContent);
                        });
                    }
                    trytofill(reply[0].course[i], queryCourse);
                }
                //$scope.coursesNotRegistered=coursesNotRegistered;
                $scope.courseStudent = courseStudent;
                //coursesNotRegistered=courseListName;
            }
        })

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

    $scope.goToRegistration = function(email, name) {
        console.log(email + " " + name);
        $window.open("/register_course.html" + "?email=" + email + "?course=" + name);
    }

    $scope.goToLecture = function(lecture) {
        $window.open("/lecture.html" + "?=email" + $scope.studentEmail + "?course=" + lecture.courseName + "?lectNum=" + lecture.number);
    }

    $scope.goToAssignment = function(assignment) {
        $window.open('/assignment.html' + '?email=' + $scope.studentEmail + "?course=" + assignment.courseName + "?assignmentNum=" + assignment.number);
    }

    $scope.goToProfile = function() {
            $window.open('/profile_student.html' + "?email=" + $scope.studentEmail);
        }
        //Fill the contents of the course

}]);
