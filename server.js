var express=require('express');
var mongojs=require('mongojs');
var bodyParser=require('body-parser');
var db=mongojs('student',['student']);
var app=express();

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.post('/student/login',function(req,res){
	console.log('Got a POST request')
	console.log(req.body);
	db.student.find(req.body).count(function(err,docs){
		var studentAuthenticationStatus=docs;
		console.log(studentAuthenticationStatus);
		res.json(studentAuthenticationStatus);
	});
})

app.listen(3003);
console.log("server is running on port 3003");