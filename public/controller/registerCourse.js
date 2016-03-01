var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('registerCourseCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log('Hello World from registerCourseCtrl');

    $scope.init = function() {
        console.log($location.absUrl());
        var res = $location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        tempData = res[2].split('=');
        var courseName = tempData[1];
        console.log(userEmail + " " + courseName);
        $scope.courseName = courseName;
        $scope.coursePrerequisites = [];
        $scope.courseInstructor = [];
        $scope.courseCompleted = [];
        $scope.courseNotCompleted = [];
        //$scope.courseCanRegister="YUP";
        $http.post('/student/getDetails', { 'email': userEmail }).success(function(response) {
            var reply = response[0];
            $scope.studentName = reply.name;
            $scope.studentEmail = userEmail;
            console.log(response[0]);
        })
        $http.post('/courseInstructor/getDetails', { 'courseName': courseName }).success(function(response) {
            var reply = response;
            //console.log(response[0].facultyName + " " + response[1].facultyName);
            $scope.courseInstructor = response;
        })
        $http.post('/course/getDetails', { 'name': courseName }).success(function(response) {
            var reply = response[0];
            $scope.course = response[0];
            $scope.courseStartDate = reply.startDate;
            $scope.courseEndDate = reply.endDate;
            $scope.courseDescription = reply.description;
            $scope.courseDepartmentName = reply.departmentName;
            console.log(response[0]);
        })
        $http.post('/course/getPrerequisites', { 'courseName': courseName }).success(function(response) {
            $scope.coursePrerequisites = response[0].courseList;
            console.log(response[0].courseList);
            var getCompleteList = function() {
                $http.post('course/getCompletedList', { 'email': userEmail }).success(function(response) {
                    $scope.courseComplete = response[0].courseCompleted;
                    console.log(response[0]);
                    var segregate = function() {
                        for (var index = 0; index < $scope.coursePrerequisites.length; index++) {
                            var done = function() {
                                for (var index_ = 0; index_ < $scope.courseComplete.length; index_++) {
                                    if ($scope.coursePrerequisites[index].name == $scope.courseComplete[index_].name) {
                                        return "1";
                                    }
                                    console.log($scope.coursePrerequisites[index].name + " " + $scope.courseComplete[index_].name);
                                }
                            }
                            if (done() == "1") {
                                //$scope.courseCanRegister="NOPE";
                                $scope.courseComplete.push({ 'name': $scope.coursePrerequisites[index].name })
                            } else {
                                //$scope.courseCanRegsiter="NOPE";
                                $scope.courseNotCompleted.push({ 'name': $scope.coursePrerequisites[index].name });
                            }
                        }
                    }
                    segregate();
                })
            }
            getCompleteList();
        })
    }

    $scope.goToCourse = function(email, name) {
        $window.location.href=("/view_course.html" + "?email=" + email + "?course=" + name);
    }

    $scope.goToRegistration = function(email, name) {
        var checkIfComplete = function() {
            $http.post('/studentCourse/getContent', { 'email': email }).success(function(response) {
                var reply = response[0];
                console.log(response[0]);
                var index = 0;
                var checkPresense = function() {
                    for (index = 0; index < response[0].course.length; index++) {
                        var isThere = function() {
                            if (response[0].course[index].courseName == name) {
                                console.log(response[0].course[index].courseName);
                                //return "1";
                                $window.location.href = '/view_course.html' + "?email=" + email + "?course=" + name;
                                return "1";
                            }
                        }
                        if (isThere() == "1") {
                            return "1";
                        }
                    }
                    return "0";
                    //$window.location.href="/register_course.html"+"?email="+email+"?course="+name;
                }
                if (checkPresense() == "0") {
                    if (index == response[0].course.length) {
                        $window.location.href = "/register_course.html" + "?email=" + email + "?course=" + name;
                    }
                }
            })
        }
        checkIfComplete();
    }

    $scope.register = function(email, course) {
        console.log($scope.courseNotCompleted.length);
        if ($scope.courseNotCompleted.length == 0) {
            $http.post('/course/RegisterStudent/' + email, { 'courseName': course, 'assignmentCompleted': '0', 'lecturesCompleted': '0' }).success(function(response) {
                    var reply = response;
                    console.log(response[0]);
                })
                //New databse add it in StudentsEntrolled
            $http.post('/enroll/student/' + course, { 'email': email }).success(function(response) {
                var reply = response[0];
                console.log(response[0]);
            })
            console.log('hererer' + course + " " + email);
        } else {
            console.log("LOLXD");
        }

        var addingCourse=function(){
            var calenderStart={};
            var calenderEnd={};
            var startDate=$scope.courseStartDate.split('-');
            var endDate=$scope.courseEndDate.split('-');
            var addToCalender=function(){
                calenderStart.email=email;
                calenderStart.type="course";
                calenderStart.courseName=course;
                calenderStart.evenType="start";
                calenderStart.content="Course "+course+" is going to start";
                calenderStart.date=$scope.courseStartDate;
                calenderStart.numberOFDays=parseInt(startDate[0])+parseInt(startDate[1])*30+parseInt(startDate[2])*365;

                calenderEnd.email=email;
                calenderEnd.type="course";
                calenderEnd.courseName=course;
                calenderEnd.evenType="end";
                calenderEnd.content="Course "+course+" is going to end";
                calenderEnd.date=$scope.courseStartDate;
                calenderEnd.numberOFDays=parseInt(endDate[0])+parseInt(endDate[1])*30+parseInt(endDate[2])*365;

                var add=function(){
                    $http.post('/calender/addEvent',calenderStart).success(function(response){
                        console.log(response[0]);
                    })
                    $http.post('/calender/addEvent',calenderEnd).success(function(response){
                        console.log(response[0]);
                    })
                }
                add();
            }
            addToCalender();
        }
        addingCourse();
    }
}])
