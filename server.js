var express=require('express');
var mongojs=require('mongojs');
var bodyParser=require('body-parser');
var dbStudent=mongojs('student',['student']);
var dbParent=mongojs('parent',['parent']);
var dbFaculty=mongojs('faculty',['faculty']);
var dbAdmin=mongojs('admin',['admin']);
var dbCourse=mongojs('course',['course']);
var dbStudentCourse=mongojs('studentCourse',['studentCourse']);
var dbCourseTaught=mongojs('courseTaught',['courseTaught']);
var dbLectureCourse=mongojs('lectureCourse',['lectureCourse']);
var dbAssignmentCourse=mongojs('assignmentCourse',['assignmentCourse']);
var dbLecture=mongojs('lecture',['lecture']);
var dbAssignment=mongojs('assignment',['assignment']);
var dbAssignmentAnswer=mongojs('assignmentAnswer',['assignmentAnswer']);
var dbCoursePrerequisites=mongojs('coursePrerequisites',['coursePrerequisites']);
var dbCourseComplete=mongojs('courseComplete',['courseComplete']);
var dbCourseStudents=mongojs('courseStudents',['courseStudents']);
var dbNotification=mongojs('notification',['notification']);
var dbParentChild=mongojs('parentChild',['parentChild']);
var dbParentChildRequest=mongojs('parentChildRequest',['parentChildRequest']);
var dbAssignmentMarks=mongojs('assignmentMarks',['assignmentMarks']);
var dbCalender=mongojs('calender',['calender']);
var app=express();
var server=require('http').Server(app);
var io=require('socket.io')(server);

server.listen(3007);
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
console.log("Hello World from Server");

io.on('connection',function(socket){
	console.log('Another connection added');
	socket.on('notificationRecieve',function(data){
		io.emit('notificationSent',{'data':'notification Reload'});
		console.log('sent DATA');
	})
})

app.post('/student/login',function(req,res){
	console.log('Got a POST request')
	console.log(req.body);
	dbStudent.student.find(req.body).count(function(err,docs){
		var studentAuthenticationStatus=docs;
		console.log(studentAuthenticationStatus);
		res.json(studentAuthenticationStatus);
	});
})

app.post('/faculty/login',function(req,res){
	console.log('Got a POST request')
	console.log(req.body);
	dbFaculty.faculty.find(req.body).count(function(err,docs){
		var facultyAuthenticationStatus=docs;
		console.log(facultyAuthenticationStatus);
		res.json(facultyAuthenticationStatus);
	});
})

app.post('/parent/login',function(req,res){
	console.log('Got a POST request')
	console.log(req.body);
	dbParent.parent.find(req.body).count(function(err,docs){
		var parentAuthenticationStatus=docs;
		console.log(parentAuthenticationStatus);
		res.json(parentAuthenticationStatus);
	});
})

app.post('/admin/login',function(req,res){
	console.log('Got a POST request')
	console.log(req.body);
	dbAdmin.admin.find(req.body).count(function(err,docs){
		var adminAuthenticationStatus=docs;
		console.log(adminAuthenticationStatus);
		res.json(adminAuthenticationStatus);
	});
})

app.post('/student/register',function(req,res){
	console.log('Got a POST request');
	console.log(req.body);
	dbStudent.student.insert(req.body,function(err,doc){
		res.json(doc);
		//console.log(docs);
	});
});

app.post('/faculty/register',function(req,res){
	console.log('Got a POST request');
	console.log(req.body);
	dbFaculty.faculty.insert(req.body,function(err,doc){
		res.json(doc);
		//console.log(docs);
	});
});

app.post('/parent/register',function(req,res){
	console.log('Got a POST request');
	console.log(req.body);
	dbParent.parent.insert(req.body,function(err,doc){
		res.json(doc);
		//console.log(docs);
	});
});

app.post('/admin/register',function(req,res){
	console.log('Got a POST request');
	console.log(req.body);
	dbAdmin.admin.insert(req.body,function(err,doc){
		res.json(doc);
		//console.log(docs);
	});
});

app.post('/student/getDetails',function(req,res){
	console.log('Got a POST request for details of student');
	console.log(req.body);
	dbStudent.student.find(req.body,function(err,doc){
		console.log(doc);
		res.json(doc);
		//console.log(res.student);
	})
})

app.post('/studentCourse/getContent',function(req,res){
	console.log('Got a POST request for studentCourse details');
	console.log(req.body);
	dbStudentCourse.studentCourse.find(req.body,function(err,doc){
		console.log(doc);
		res.json(doc);
	})
})

app.post('/course/getDetails',function(req,res){
	console.log('Got a POST request for course details');
	console.log(req.body);
	dbCourse.course.find(req.body,function(err,doc){
		console.log(doc);
		console.log("success");
		res.json(doc);
	})
})

app.post('/faculty/getDetails',function(req,res){
	console.log('Got a POST request for facultyDeatils');
	console.log(req.body);
	dbFaculty.faculty.find(req.body,function(err,doc){
		console.log(doc);
		res.json(doc);
	})
})

app.post('/courseInstructor/getDetails',function(req,res){
	console.log('Got a POST request for courseInstructor details');
	console.log(req.body);
	dbCourseTaught.courseTaught.find(req.body,function(err,doc){
		//console.log(doc[0].facultyName);
		res.json(doc);
	})
})

app.post('/lecture/getList',function(req,res){
	console.log('Got a POST request for lectureCourse details');
	console.log(req.body);
	dbLectureCourse.lectureCourse.find(req.body,function(err,doc){
		if(err){
			console.log('Error');
		}
		else{
			//console.log(doc[0].lectureName);
			res.json(doc);
		}
	})
})

app.post('/assignment/getList',function(req,res){
	console.log('Got a POST request for assignmentCourse details');
	console.log(req.body);
	dbAssignmentCourse.assignmentCourse.find(req.body,function(err,doc){
		//console.log(doc[0].assignmentName);
		res.json(doc);
	})
})

app.post('/lecture/getDetails',function(req,res){
	console.log('Got a POST request for lecture details');
	console.log(req.body);
	dbLecture.lecture.find(req.body,function(err,doc){
		//console.log(doc[0].lectureContent);
		res.json(doc);
	})
})

app.post('/assignment/getDetails',function(req,res){
	console.log('Got a POST request for assignemnt details');
	console.log(req.body);
	dbAssignment.assignment.find(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/course/notInList',function(req,res){
	console.log('Got a POST request for courseNotInList details');
	console.log("here->"+req.body);
	console.log("done");
	dbCourse.course.find({'name':{$nin:req.body}},function(err,docs){
		res.json(docs);
	})
})

app.post('/courseTaught/getCourses',function(req,res){
	console.log('Got a POST request for courseTaught details');
	console.log(req.body);
	dbCourseTaught.courseTaught.find(req.body,function(err,doc){
		res.json(doc);
	})
})

app.post('/course/updateDetails/:courseName',function(req,res){
	console.log('Got a POST request for course/updateDeatils');
	var courseName=req.params.courseName;
	console.log(courseName+" "+req.body);
	dbCourse.course.update({'name':req.params.courseName},{$set:req.body},function(err,docs){
		res.json(docs);
	})
})

app.post('/lecture/addLecture',function(req,res){
	console.log('Got a POST request for lecture/addLecture');
	dbLecture.lecture.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/lectureCourse/addEntry',function(req,res){
	console.log('Got a POST request for lectureCourse/addEntry');
	dbLectureCourse.lectureCourse.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/answerToAssignment/getAnswers',function(req,res){
	console.log('Got a POST request for answerToAssignment/getAnswers');
	dbAssignmentAnswer.assignmentAnswer.find(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/assignment/addAssignment',function(req,res){
	console.log('Got a POST request for assignment/addAssignment');
	dbAssignment.assignment.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/AssignmentCourse/addEntry',function(req,res){
	console.log('Got a POST request for AssignmentCourse/assEntry');
	dbAssignmentCourse.assignmentCourse.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/AssignmentAnswer/addAnswer',function(req,res){
	console.log('Got a POST request for /AssignmentAnswer/addAnswer');
	dbAssignmentAnswer.assignmentAnswer.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/course/getPrerequisites',function(req,res){
	console.log('Got a POST request from /course/getPrerequisites');
	dbCoursePrerequisites.coursePrerequisites.find(req.body,function(err,docs){
		res.json(docs);
		console.log(docs[0]);
	})
})

app.post('/course/getCompletedList',function(req,res){
	console.log('Got a POST request from /course/getCompletedList');
	dbCourseComplete.courseComplete.find(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/course/RegisterStudent/:email',function(req,res){
	console.log('Got a POST request from /course/RegisterStudent');
	dbStudentCourse.studentCourse.update({'email':req.params.email},{$push:{course:req.body}},function(err,docs){
		res.json(docs);
	})
})

app.post('/enroll/student/:courseName',function(req,res){
	console.log('Got a POST request from /enroll/student'+" "+req.body);
	dbCourseStudents.courseStudents.update({'courseName':req.params.courseName},{$push:{studentEmail:req.body}},function(err,docs){
		res.json(docs);
	})
})

app.post('/studentsEnrolled/getList',function(req,res){
	console.log('Got a POST request from /studentsEnrolled/getList');
	dbCourseStudents.courseStudents.find(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/notification/student',function(req,res){
	console.log('Got a POST request from /notification/student');
	dbNotification.notification.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/notification/getDetails',function(req,res){
	console.log('Got a POST request from /notification/getDetails');
	dbNotification.notification.find(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/studentCourse/updateContent/:email',function(req,res){
	console.log('Got a POST request from /studentCourse/updateContent');
	console.log(req.params.email);
	console.log(req.body);
	dbStudentCourse.studentCourse.update({'email':req.params.email},{$set:{'course':req.body.course}},function(err,docs){
		res.json(docs);
		console.log(docs);
	})
})

app.post('/parent/getDetails',function(req,res){
	console.log('Got a POST request from /parent/getDetails');
	dbParent.parent.find(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/parent/getChildList',function(req,res){
	console.log('Got a POST request from /parent/getChildList');
	dbParentChild.parentChild.find(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/parent/sendRequest',function(req,res){
	console.log('Got a POST request from /parent/sendRequest');
	dbParentChildRequest.parentChildRequest.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/parentChild/getDetails',function(req,res){
	console.log('Got a POST request from /parentChild/getDetails');
	dbParentChildRequest.parentChildRequest.find(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/parentChild/deleteRequest',function(req,res){
	console.log('Got a POST request from /parentChild/deleteRequest');
	dbParentChildRequest.parentChildRequest.remove(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/parentChild/addEntry',function(req,res){
	console.log('Got a POST request from /parentChild/addEntry');
	dbParentChild.parentChild.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/student/updateDetails/:email',function(req,res){
	console.log('Got a POST request from /student/updateDetails');
	console.log(req.params.email);
	dbStudent.student.update({'email':req.params.email},{$set:req.body},function(err,docs){
		res.json(docs);
	})
})

app.post('/course/AddCourse',function(req,res){
	console.log('Got a POST request from /course/AddCourse');
	dbCourse.course.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/courseTaught/addEntry',function(req,res){
	console.log('Got a POST request from /courseTaught/addEntry');
	console.log(req.body);
	dbCourseTaught.courseTaught.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.post('/coursePrerequisites/addEntry',function(req,res){
	console.log('Got a POST from /coursePrerequisites/addEntry');
	console.log(req.body);
	dbCoursePrerequisites.coursePrerequisites.insert(req.body,function(err,docs){
		console.log(docs);
		res.json(docs);
	})
})

app.post('/studentCourse/addEntry',function(req,res){
	console.log('Got a POST request from /studentCourse/addEntry');
	console.log(req.body);
	dbCourseStudents.courseStudents.insert(req.body,function(err,docs){
		console.log(docs);
	})
})

app.post('/studentCourseReg/addEntry',function(req,res){
	console.log('Got a POST request from /studentCourseReg/addEntry');
	console.log(req.body);
	dbStudentCourse.studentCourse.insert(req.body,function(err,docs){
		console.log(docs);
	})
})

app.post('/faculty/updateDetails/:email',function(req,res){
	console.log('Got a POST request from /faculty/updateDetails');
	console.log(res.body);
	dbFaculty.faculty.update({'email':req.params.email},{$set:req.body},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
})

app.post('/assignmentMarks/insert',function(req,res){
	console.log('Got a POST request from /assignmentMarks/insert');
	console.log(req.body);
	dbAssignmentMarks.assignmentMarks.insert(req.body,function(err,docs){
		console.log(docs);
	})
})

app.post('/assignmentMarks/getDetails',function(req,res){
	console.log('Got a POST request from /assignmentMarks/getDetails');
	console.log("here");
	console.log(req.body);
	dbAssignmentMarks.assignmentMarks.find(req.body,function(err,docs){
		console.log(docs);
		res.json(docs);
	})
})

app.post('/calender/getDetails/',function(req,res){
	console.log('Got a POST request from /calender/getDetails');
	console.log(req.body);
	dbCalender.calender.find(req.body,function(err,docs){
		console.log(docs);
		res.json(docs);
	})
})

app.post('/calender/addEvent',function(req,res){
	console.log('Got a POST request from /calender/addEvent');
	dbCalender.calender.insert(req.body,function(err,docs){
		console.log(docs);
		res.json(docs);
	})
})

app.post('/parent/updateDetails/:email',function(req,res){
	console.log('Got a POST request from /parent/getDetails');
	console.log(req.params.email);
	dbParent.parent.update({'email':req.params.email},{$set:req.body},function(err,docs){
		console.log(docs);
		res.json(docs);
	})
})

//To Add a new course->db.studentCourse.update({email:'abc@xyz'},{$push:{course:{courseId:"56cf294f3d25a2f651cd56a8",assignmentCompleted:'2',lecturesCompleted:'4'}}})

//To get the list of all courses not registered by that guy->db.course.find({'name':{$nin:['Algorithms']}})

app.listen(3008);
console.log("server is running on port 3008");