var express=require('express');
var mongojs=require('mongojs');
var bodyParser=require('body-parser');
var dbStudent=mongojs('student',['student']);
var dbParent=mongojs('parent',['parent']);
var dbFaculty=mongojs('faculty',['faculty']);
var dbAdmin=mongojs('admin',['admin']);
var dbCourse=mongojs('course',['course']);
var dbStudentCourse=mongojs('studentCourse',['studentCourse']);
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
		res.json(doc);
	})
})

//To Add a new course->db.studentCourse.update({email:'abc@xyz'},{$push:{course:{courseId:"56cf294f3d25a2f651cd56a8",assignmentCompleted:'2',lecturesCompleted:'4'}}})


app.listen(3003);
console.log("server is running on port 3003");