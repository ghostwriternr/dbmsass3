var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('cFacultyCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log("Hello World from cFacultyCtrl");

    $scope.init = function() {
        console.log($location.absUrl());
        var res = $location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        tempData = res[2].split('=');
        var courseName = tempData[1].split('%20').join(' ');
        console.log(userEmail + " " + courseName);
        $scope.courseName = courseName;
        $scope.choices = [];
        $scope.content = {};
        $scope.studentsEnrolled = [];
        $http.post('/faculty/getDetails', { 'email': userEmail }).success(function(response) {
            var reply = response[0];
            $scope.facultyName = reply.name;
            $scope.facultyEmail = userEmail;
        })
        $http.post('/courseInstructor/getDetails', { 'courseName': courseName }).success(function(response) {
            var reply = response;
            //console.log(reply[0].facultyName + " " + reply[1].facultyName);
            $scope.courseInstructor = reply;
        })
        $http.post('/course/getDetails', { 'name': courseName }).success(function(response) {
            var reply = response[0];
            $scope.course = response[0];
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
        $http.post('/studentsEnrolled/getList', { 'courseName': courseName }).success(function(response) {
            if (response.length != 0) {
                console.log(response[0]);
                var display = function() {
                    console.log('here');
                    for (var index = 0; index < response[0].studentEmail.length; index++) {
                        console.log(response[0].studentEmail[index]);
                        var studentEmail = response[0].studentEmail[index].email;
                        $http.post('/student/getDetails', { 'email': response[0].studentEmail[index].email }).success(function(responseStudent) {
                            console.log(responseStudent[0]);
                            var fill = function() {
                                $scope.studentsEnrolled.push({ 'email': studentEmail, 'name': responseStudent[0].name });
                            }
                            fill();
                        })
                    }
                }
                display();
            }
        })
    }

    $scope.goToHome=function(){
    var res = $location.absUrl().split('?');
    var tempData = res[3].split('=');
    var personType = tempData[1];    
    console.log(personType);
    if(personType == 'faculty'){
        $window.location.href="/faculty.html"+"?email="+$scope.facultyEmail+"?type=faculty";
        console.log("/faculty.html"+"?email="+$scope.facultyEmail+"?type=faculty");
    }
    }

    $scope.goToProfile = function() {
    $window.location.href=("/profile.html" + "?email=" + $scope.facultyEmail+"?type=faculty");
    }

    $scope.logOut = function() {
    $window.location.href=("/index.html");
    }

    $scope.goToLecture = function(email, course, lectureNum) {
        $window.location.href=('/lecture.html' + "?email=" + email + "?course=" + course + "?lectNum=" + lectureNum+"?type=faculty");
    }

    $scope.goToAssignment = function(email, course, assignmentNum) {
        $window.location.href=('/assignment.html' + "?email=" + email + "?course=" + course + "?assignmentNum=" + assignmentNum+"?type=faculty");
    }

    $scope.setTypeOfContent = function(type) {
        $scope.content.type = type;
        console.log("Type: " + $scope.content.type)
    }

    $scope.setAnswerToQuestions = function() {
        $scope.choices=[];
        var push=function(){
            for (index = 0; index < $scope.questionsCount; index++) {
                $scope.choices.push({ 'id': '' });
            }
            console.log($scope.content.type);
        }
        push();
    }

    $scope.addContent = function(content) {
        console.log(content.type);
        if (content.type == 1) {
            //lecture
            var update = function() {
                $scope.course.lectures = parseInt($scope.course.lectures) + 1;
                var update = function() {
                    $http.post('/course/updateDetails/' + $scope.course.name, { 'lectures': $scope.course.lectures }).success(function(response) {
                        //qwe
                    })
                }
                update();
                var lecture = {};
                var lectureContent = {};
                var addLecture = function() {
                    var date=[];
                    lecture.courseName = $scope.courseName;
                    lecture.lectureName = content.title;
                    lecture.lectureNumber = $scope.course.lectures + "";
                    lecture.lectureContent = content.content;
                    lecture.lectureDate = content.startDate;
                    lectureContent.courseName = $scope.courseName;
                    lectureContent.lectureName = content.title;
                    lectureContent.lectureNumber = $scope.course.lectures + "";
                    date=content.startDate.split('-');
                    var httprequest = function(lecture) {
                        console.log(lecture);
                        $http.post('/lecture/addLecture', lecture).success(function(response) {
                            console.log(response[0]);
                        })
                        $http.post('/lectureCourse/addEntry', lectureContent).success(function(response) {
                            console.log(response[0]);
                        })
                        var sendAll = function() {
                            for (var index = 0; index < $scope.studentsEnrolled.length; index++) {
                                var notification = {};
                                notification.email = $scope.studentsEnrolled[index].email;
                                notification.message = "Lecture number " + lectureContent.lectureNumber + " " + "for course " + $scope.courseName;
                                notification.type = "lecture";
                                notification.from = $scope.facultyName;
                                notification.fromEmail = $scope.facultyEmail;
                                notification.number = lectureContent.lectureNumber;
                                notification.courseName = lectureContent.courseName;
                                var calender={};
                                calender.email=$scope.studentsEnrolled[index].email;
                                calender.type="lecture";
                                calender.courseName=lectureContent.courseName;
                                calender.evenType="start";
                                calender.content="Lecture Number "+lectureContent.lectureNumber+" "+"for course "+$scope.courseName;
                                calender.date=lecture.lectureDate;
                                calender.numberOFDays=parseInt(date[0])+parseInt(date[1])*30+parseInt(date[2])*365;
                                var send = function() {
                                    $http.post('/notification/student', notification).success(function(response) {
                                        console.log(response[0]);
                                    })
                                    $http.post('/calender/addEvent',calender).success(function(response){
                                        console.log(response[0]);
                                    })
                                }
                                send();
                            }
                        }
                        sendAll();
                        var sendAllInstructors = function() {
                            for (var index = 0; index < $scope.courseInstructor.length; index++) {
                                var notification = {};
                                notification.email = $scope.courseInstructor[index].facultyEmail;
                                notification.message = "Lecture number " + lectureContent.lectureNumber + " " + "for course " + $scope.courseName;
                                notification.type = "lecture";
                                notification.from = $scope.facultyName;
                                notification.fromEmail = $scope.facultyEmail;
                                notification.number = lectureContent.lectureNumber;
                                notification.courseName = lectureContent.courseName;
                                var send = function() {
                                    console.log(notification);
                                    $http.post('/notification/student', notification).success(function(response) {
                                        console.log(response[0]);
                                    })
                                }
                                send();
                            }
                        }
                        sendAllInstructors();
                    }
                    httprequest(lecture);
                }
                addLecture();
            }
            update();
        } else if (content.type == 2) {
            //assignment
            var update = function() {
                $scope.course.assignment = parseInt($scope.course.assignment) + 1;
                var update = function() {
                    $http.post('/course/updateDetails/' + $scope.course.name, { 'assignment': $scope.course.assignment }).success(function(response) {
                        //qwe
                    })
                }
                update();
                var assignment = {};
                var assignmentContent = {};
                var assignmentAnswer = {};
                var addLecture = function() {
                    var startDate=[];
                    var endDate=[];
                    assignment.courseName = $scope.courseName;
                    assignment.assignmentName = content.title;
                    assignment.assignmentNumber = $scope.course.assignment + "";
                    assignment.assignmentContent = content.content;
                    assignment.assignmentStartDate = content.startDate;
                    assignment.assignmentEndDate = content.endDate;
                    assignment.assignmentQuestionCount = $scope.questionsCount;
                    assignmentContent.courseName = $scope.courseName;
                    assignmentContent.assignmentName = content.title;
                    assignmentContent.assignmentNumber = $scope.course.assignment + "";
                    assignmentAnswer.courseName = $scope.courseName;
                    assignmentAnswer.assignmentNumber = $scope.course.assignment + "";
                    startDate=content.startDate.split('-');
                    endDate=content.endDate.split('-');
                    assignmentAnswer.answer = [];
                    var FillArray = function() {
                        for (var index = 0; index < $scope.questionsCount; index++) {
                            assignmentAnswer.answer.push($scope.choices[index].answer + "");
                        }
                        var httprequest = function() {
                            console.log(assignment);
                            console.log(assignmentContent);
                            console.log(assignmentAnswer);
                            $http.post('/assignment/addAssignment', assignment).success(function(response) {
                                console.log(response[0]);
                            })
                            $http.post('/AssignmentCourse/addEntry', assignmentContent).success(function(response) {
                                console.log(response[0]);
                            })
                            $http.post('/AssignmentAnswer/addAnswer', assignmentAnswer).success(function(response) {
                                console.log(response[0]);
                            })
                            var sendAll = function() {
                                for (var index = 0; index < $scope.studentsEnrolled.length; index++) {
                                    var notification = {};
                                    var calenderStart={};
                                    var calenderEnd={};
                                    notification.email = $scope.studentsEnrolled[index].email;
                                    notification.message = "Assignment number " + assignmentContent.assignmentNumber + " " + "for course " + $scope.courseName;
                                    notification.type = "assignment";
                                    notification.from = $scope.facultyName;
                                    notification.fromEmail = $scope.facultyEmail;
                                    notification.number = assignmentContent.assignmentNumber;
                                    notification.courseName = assignmentContent.courseName;

                                    calenderStart.email=$scope.studentsEnrolled[index].email;
                                    calenderStart.type="assignment";
                                    calenderStart.courseName=assignmentContent.courseName;
                                    calenderStart.evenType="start";
                                    calenderStart.content="Assignment Number "+assignmentContent.assignmentNumber+" "+"for course "+$scope.courseName+" added";
                                    calenderStart.date=content.startDate;
                                    calenderStart.numberOFDays=parseInt(startDate[0])+parseInt(startDate[1])*30+parseInt(startDate[2])*365;

                                    calenderEnd.email=$scope.studentsEnrolled[index].email;
                                    calenderEnd.type="assignment";
                                    calenderEnd.courseName=assignmentContent.courseName;
                                    calenderEnd.evenType="end";
                                    calenderEnd.content="Assignment Number "+assignmentContent.assignmentNumber+" "+"for course "+$scope.courseName+" is ending today";
                                    calenderEnd.date=content.endDate;
                                    calenderEnd.numberOFDays=parseInt(endDate[0])+parseInt(endDate[1])*30+parseInt(endDate[2])*365;

                                    var send = function() {
                                        console.log(calenderEnd);
                                        console.log(calenderStart);
                                        $http.post('/notification/student', notification).success(function(response) {
                                            console.log(response[0]);
                                        })
                                        $http.post('/calender/addEvent',calenderStart).success(function(response){
                                            console.log(response[0]);
                                        })
                                        $http.post('/calender/addEvent',calenderEnd).success(function(response){
                                            console.log(response[0]);
                                        })
                                    }
                                    send();
                                }
                            }
                            sendAll();
                            //console.log("werwerwer "+$scope.courseInstructor.length);
                            var sendAllInstructors = function() {
                                for (var index = 0; index < $scope.courseInstructor.length; index++) {
                                    var notification = {};
                                    notification.email = $scope.courseInstructor[index].facultyEmail;
                                    notification.message = "Assignment number " + assignmentContent.assignmentNumber + " " + "for course " + $scope.courseName;
                                    notification.type = "assignment";
                                    notification.from = $scope.facultyName;
                                    notification.fromEmail = $scope.facultyEmail;
                                    notification.number = assignmentContent.assignmentNumber;
                                    notification.courseName = assignmentContent.courseName;
                                    var send = function() {
                                        console.log(notification);
                                        $http.post('/notification/student', notification).success(function(response) {
                                            console.log(response[0]);
                                        })
                                    }
                                    send();
                                }
                            }
                            sendAllInstructors();
                        }
                        httprequest();
                    }
                    FillArray();
                    //httprequest(lecture);
                }
                addLecture();
            }
            update();
        }
    }

    $scope.setStudentRecieveEmail = function(email) {
        $scope.studentREmail = email;
    }

    $scope.sendMessage = function(courseName) {
        var notification = {};
        notification.email = $scope.studentREmail;
        notification.message = $scope.message;
        notification.type = "message"
        notification.from = $scope.facultyName;
        notification.fromEmail = $scope.facultyEmail;
        notification.number = "0";
        notification.courseName = courseName;
        var display = function() {
            console.log(notification);
            $http.post('/notification/student', notification).success(function(response) {
                console.log(response[0]);
            })
        }
        display();
    }
}])
