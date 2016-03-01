var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('cStudentCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log("Hello World from studentCtrl");

    $scope.init = function() {
        console.log($location.absUrl());
        var res = $location.absUrl().split('?');
        $scope.locationRes=$location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        $scope.userEmail=tempData[1];
        tempData = res[2].split('=');
        var courseName = tempData[1];
        console.log(userEmail + " " + courseName);
        $scope.courseName = courseName;
        $http.post('/student/getDetails', { 'email': userEmail }).success(function(response) {
            var reply = response[0];
            $scope.studentName = reply.name;
            $scope.studentEmail = userEmail;
        })
        $http.post('/courseInstructor/getDetails', { 'courseName': courseName }).success(function(response) {
            var reply = response;
            //console.log(reply[0].facultyName + " " + reply[1].facultyName);
            $scope.courseInstructor = reply;
        })
        $http.post('/course/getDetails', { 'name': courseName }).success(function(response) {
            var reply = response[0];
            //$scope.courseName=reply.name;
            $scope.startDate = reply.startDate;
            $scope.endDate = reply.endDate;
            $scope.courseDescription = reply.description;
        })
        $http.post('/lecture/getList', { 'courseName': courseName }).success(function(response) {
            $scope.lectureCourse = response;
            console.log('done');
        })
        $http.post('/assignment/getList', { 'courseName': courseName }).success(function(response) {
            $scope.assignmentCourse = response;
            console.log('done');
        })
        var courseStudent = [];
        $http.post('/studentCourse/getContent', { 'email': userEmail }).success(function(response) {
            var reply = response;
            var courseStudentContent = {}
            for (var i = 0; i < reply[0].course.length; i++) {
                var queryCourse = { 'name': reply[0].course[i].courseName };
                console.log(queryCourse);
                var trytofill = function(courseinfo) {
                    $scope.assignmentCompleted = courseinfo.assignmentCompleted;
                    console.log("here ---->" + $scope.assignmentCompleted + " ");
                    $scope.lecturesCompleted = courseinfo.lecturesCompleted;
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
                            console.log(courseStudentContent);
                        }
                        fillin(replyC);
                        console.log(courseStudentContent);
                    });
                }
                if (reply[0].course[i].courseName == courseName) {
                    trytofill(reply[0].course[i], queryCourse);
                }
            }
            $scope.courseStudent = courseStudent;
        })
        
        var call=function(){
            console.log("here");
            var query={'studentEmail':$scope.userEmail,'courseName':$scope.courseName};
            var display=function(){
                console.log(query);
                $http.post('/assignmentMarks/getDetails',query).success(function(response){
                    console.log("herererer");
                    console.log("idar hun");
                    var dataset=[];
                    $scope.value=0;
                    var fill=function(){
                        for(var index=0;index<response.length;index++){
                            dataset=dataset.concat(30*parseFloat(response[index].assignmentMarks)/parseFloat(response[index].assignmentQuestions));
                            $scope.value=$scope.value+parseFloat(response[index].assignmentMarks)/parseFloat(response[index].assignmentQuestions);
                        }
                        // d3.select("#graph").selectAll("div")
                        //     .data(dataset)
                        //     .enter()
                        //     .append("div")
                        //     .attr("class", "bar")
                        //     .style("height", function(d) {
                        //         var barHeight = d * 5;
                        //         return barHeight + "px";
                        //     });
                        $scope.value=10*$scope.value/parseFloat(response.length);
                    }
                    fill();
                })
            }
            display();
        }
        call();
    }

    $scope.goToLecture = function(email, course, lectureNum) {
        if($scope.locationRes.length==4){
            $window.location.href=('/lecture.html' + "?email=" + email + "?course=" + course + "?lectNum=" + lectureNum+"?type=student");
        }
    }

    $scope.goToAssignment = function(email, course, assignmentNum) {
        if($scope.locationRes.length==4){
            $window.location.href=('/assignment.html' + "?email=" + email + "?course=" + course + "?assignmentNum=" + assignmentNum+"?type=student");
        }
    }

    $scope.isParent=function(){
        return ( $location.absUrl().indexOf('?type=parent') >= 0 );
    }

    $scope.emailFaculty = function() {
        if($scope.locationRes.length==4){
            var notification = {};
            for (var index = 0; index < $scope.courseInstructor.length; index++) {
                var notification = {};
                notification.email = $scope.courseInstructor[index].facultyEmail;
                notification.message = $scope.messageContent;
                notification.type = "message"
                notification.from = $scope.studentName;
                notification.fromEmail = $scope.studentEmail;
                notification.number = "0";
                notification.courseName = $scope.courseName;
                var display = function() {
                    $http.post('/notification/student/', notification).success(function(response) {
                        console.log(response[0]);
                    })
                }
                display();
            }
        }
    }

    $scope.goToHome=function(){
        if($scope.locationRes.length==4){
            console.log('Go To HOME');
            $window.location.href="/student.html"+"?email="+$scope.studentEmail+"?type=student";
        }
    }

    $scope.goToProfile=function(){
        if($scope.locationRes.length==4){
            $window.location.href="/profile_student.html"+"?email="+$scope.studentEmail+"?type=student";
        }
    }
}])
