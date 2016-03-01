var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('assignmentCtrl', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log('Hello World from assignmentCtrl');

    $scope.init = function() {
        console.log($location.absUrl());
        var res = $location.absUrl().split('?');
        var tempData = res[1].split('=');
        var userEmail = tempData[1];
        $scope.studentEmail = tempData[1];
        tempData = res[2].split('=');
        var courseName = tempData[1].split('%20').join(' ');
        $scope.courseName = tempData[1].split('%20').join(' ');
        tempData = res[3].split('=');
        var assignmentNumber = tempData[1];
        $scope.currentAssignmentNumber=tempData[1];
        tempData=res[4].split('=');
        $scope.personType=tempData[1];
        var student = {};
        var course = {};
        var assignment = {};
        $scope.choices = [];
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
        $http.post('/assignment/getDetails', { 'courseName': courseName, 'assignmentNumber': assignmentNumber }).success(function(response) {
            var reply = response[0];
            $scope.assignment = reply;
            console.log($scope.assignment);
            var createListAnswer = function(assignment) {
                console.log(assignment.assignmentQuestionCount);
                for (var index = 0; index < assignment.assignmentQuestionCount; index++) {
                    var push = function() {
                        console.log(index);
                        $scope.choices.push({ 'answer': '' });
                    }
                    push()
                }
            }
            createListAnswer($scope.assignment);
        })

    }

    $scope.isStudent = function() {
        //console.log('hererer');
        return ($scope.personType=='student');
    }

    $scope.evaluate = function() {
        if($scope.personType=='student'){
            var answers = [];
            $http.post('/answerToAssignment/getAnswers', { 'courseName': $scope.course.name, 'assignmentNumber': $scope.assignment.assignmentNumber }).success(function(response) {
                var reply = response[0].answer;
                console.log(response[0]);
                var evaluateAnswer = function(reply) {
                    var countCorrectAnswers = 0;
                    var check = function(countCorrectAnswers) {
                        for (index = 0; index < $scope.assignment.assignmentQuestionCount; index++) {
                            if (response[0].answer[index] == $scope.choices[index].answer) {
                                countCorrectAnswers++;
                            }
                            //console.log($scope.choices[index]+" "+response[0].answer[index]);
                        }
                        var displayResult = function(countCorrectAnswers) {
                            console.log('You got->' + countCorrectAnswers);
                            $scope.correctAnswerCount = countCorrectAnswers;
                        }
                        displayResult(countCorrectAnswers);
                    }
                    check(countCorrectAnswers);
                }
                evaluateAnswer(reply);
            })
        }
        else{
            //qwe
        }
    }

    $scope.doneWithAssignment = function(studentEmail, courseName) {
        if($scope.personType=='student'){
            $http.post('/studentCourse/getContent', { 'email': studentEmail }).success(function(response) {
                console.log(response[0]);
                var addCount = function() {
                    for (var index = 0; index < response[0].course.length; index++) {
                        console.log(response[0].course[index]);
                        var assignmentMarks={};
                        var check = function() {
                            if (response[0].course[index].courseName == courseName && parseInt(response[0].course[index].assignmentCompleted)+1==parseInt($scope.currentAssignmentNumber) && $scope.personType=='student') {
                                console.log(response[0].course[index].courseName);
                                response[0].course[index].assignmentCompleted = (parseInt(response[0].course[index].assignmentCompleted) + 1) + "";
                                assignmentMarks.studentEmail=$scope.student.email;
                                assignmentMarks.courseName=$scope.course.name;
                                assignmentMarks.assignmentNumber=$scope.currentAssignmentNumber;
                                assignmentMarks.assignmentQuestions=$scope.assignment.assignmentQuestionCount;
                                assignmentMarks.assignmentMarks=$scope.correctAnswerCount;
                                var update = function() {
                                    console.log(response[0]);
                                    console.log("updating here");
                                    $http.post('/studentCourse/updateContent/' + studentEmail, response[0]).success(function(response) {
                                        var reply = response[0];
                                        console.log(response[0]);
                                    })
                                    $http.post('/assignmentMarks/insert',assignmentMarks).success(function(response){
                                        console.log(respose[0]);
                                    })
                                    console.log(assignmentMarks);
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

    $scope.goToHome=function(){
        if($scope.personType=='student'){
            $window.location.href='/student.html'+"?email="+$scope.studentEmail+"?type=student";
        }
        else if($scope.personType=='faculty'){
            $window.location.href="/faculty.html"+"?email="+$scope.studentEmail+"?type=faculty";
        }
    }

    $scope.goToProfile=function(){
        if($scope.personType=='student'){
            $window.location.href='/profile_student.html'+"?email="+$scope.studentEmail+"?type=student";
        }
        else if($scope.personType=='faculty'){
            $window.location.href="/profile.html"+"?email="+$scope.studentEmail+"?type=faculty";
        }
    }

}])
