var express=require('express');
var mongojs=require('mongojs');
var bodyParser=require('body-parser');
var db=mongojs('contactlist',['contactlist']);
var app=express();

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.listen(3005);
console.log("server is running on port 3005");