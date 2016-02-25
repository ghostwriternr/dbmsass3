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
var app=express();

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
console.log("Hello World from Server");

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

app.post('/courseInstructor/getDetails',function(req,res){
	console.log('Got a POST request for courseInstructor details');
	console.log(req.body);
	dbCourseTaught.courseTaught.find(req.body,function(err,doc){
		console.log(doc[0].facultyName);
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
			console.log(doc[0].lectureName);
			res.json(doc);
		}
	})
})

app.post('/assignment/getList',function(req,res){
	console.log('Got a POST request for assignmentCourse details');
	console.log(req.body);
	dbAssignmentCourse.assignmentCourse.find(req.body,function(err,doc){
		console.log(doc[0].assignmentName);
		res.json(doc);
	})
})

app.post('/lecture/getDetails',function(req,res){
	console.log('Got a POST request for lecture details');
	console.log(req.body);
	dbLecture.lecture.find(req.body,function(err,doc){
		console.log(doc[0].lectureContent);
		res.json(doc);
	})
})

app.post('/assignment/getDetails',function(req,res){
	console.log('Got a POST request for assignemnt details');
	console.log(req.body);
	dbAssignment.assignment.find(req.body,function(err,docs){
		console.log(doc[0].assignmentName);
		res.json(doc);
	})
})
//To Add a new course->db.studentCourse.update({email:'abc@xyz'},{$push:{course:{courseId:"56cf294f3d25a2f651cd56a8",assignmentCompleted:'2',lecturesCompleted:'4'}}})


app.listen(3005);
console.log("server is running on port 3005");