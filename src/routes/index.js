const express =require("express")
const router = express.Router()
const mongoose = require('mongoose');
const db = require('../db')
const User = mongoose.model('User')

const isAuthenticated = function(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/failure")
}

module.exports = function(passport){

	router.get("/",isAuthenticated,(req,res)=>{
		res.send(req.user)
		console.log("request from: "+req.user.username)
		console.log("Genre:"+req.user.genre)
		console.log("class: "+req.user.className)
		//console.log(req.user)
	});

	router.get("/failure",(req,res)=>{
		console.log("FAILURE")
		res.send("Something went wrong")
	});

	router.post("/register",passport.authenticate("register",{failureRedirect:"/failure",}),
		(req,res)=>{
			res.send("register success")
		})

	router.post("/login",passport.authenticate("login",{failureRedirect:"/failure",}),
		(req,res)=>{
			res.send("Login success")
		})

	router.get("/getEvents",isAuthenticated,(req,res)=>{
		classificationName = req.user.className
		genreId = req.user.genre
		const request = require("request"),
			username = "stitapplicant",
			password = "zvaaDsZHLNLFdUVZ_3cQKns",
			url = "http://"+username+":"+password+"@yv1x0ke9cl.execute-api.us-east-1.amazonaws.com/prod/events?genreId=KnvZfZ7vAkJ&classificationName=Music"
		request({url:url},function(error,resp,body){
			json = JSON.parse(body)
			res.send(json)
		})
	});

	router.post("/setPrefrences",isAuthenticated,(req,res)=>{
		const username = req.user.username
		const genre = req.body["genreId"]
		const className = req.body["classificationName"]
		console.log(username)
		User.findOneAndUpdate({username:username},{$set:{genre:genre,className:className}},{new: true},function(err,user){
			console.log("updated user: "+username)
			res.redirect("/")
		})
	});

	return router

}