const express =require("express")
const router = express.Router()
const mongoose = require('mongoose')
const db = require('../db')
const User = mongoose.model('User')
const valid = require("../validation/values.js")
const sanitize = require("mongo-sanitize")

//This checks if the client is authenticated before accessing any of the routes
const isAuthenticated = function(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/failure")
}

module.exports = function(passport){
	//Mainly used for dev purposes, sends back profile information when requested
	//Obviously would not be present in a real application but useful for verifying
	//changes to a user
	router.get("/",isAuthenticated,(req,res)=>{
		res.send(req.user)
	})

	//Redirected to when an action fails, sends back an Error message to client 
	router.get("/failure",(req,res)=>{
		console.log("FAILURE")
		error = {"Message":"something went wrong"}
		JSON.stringify(error)
		res.send(error)
	})

	//registration route that employs the Passport Registration strategy (register.js)
	router.post("/register",passport.authenticate("register",{failureRedirect:"/failure",}),
		(req,res)=>{
			//on success print this on failure redirect to /failure
			res.send("register success")
		})

	//login route employing Passport login Strategy (login.js)
	router.post("/login",passport.authenticate("login",{failureRedirect:"/failure",}),
		(req,res)=>{
			//on success print this on failure redirect to /failure
			res.send("Login success")
		})

	//Route that queries events API based on user information
	router.get("/getEvents",isAuthenticated,(req,res)=>{
		//if the user is Authenticated,grab their prefrences
		classificationName = req.user.className
		genreId = valid.genreTable[req.user.genre]
		//create a new HTTP request to the API and send back the response
		const request = require("request"),
			//ideally password  would be externalized but since this should run with minamal config 
			//I've elected to leave it in purely for ease of use 
			username = "stitapplicant",
			password = "zvaaDsZHLNLFdUVZ_3cQKns",
			url = "http://"+username+":"+password+"@yv1x0ke9cl.execute-api.us-east-1.amazonaws.com/prod/events?genreId="+genreId+"&classificationName="+classificationName
		request({url:url},function(error,resp,body){
			if(error){
				console.log("error getting events")
				res.send(error)
			}
			json = JSON.parse(body)
			console.log("successful request from: "+req.user.username)
			res.send(json)
		})
	})

	//Route to update user prefrences 
	router.post("/setPrefrences",isAuthenticated,(req,res)=>{
		const username = req.user.username
		//grab new prefrences from body and sanitize them
		const genre = sanitize(req.body["genreId"])
		const className = sanitize(req.body["classificationName"])
		//make sure the new prefs are valid
		if(!valid.cNames.includes(className) ||!(Object.keys(valid.genreTable)).includes(genre)){
			console.log("genre/classification are not valid plase try again")
			res.redirect("/failure")
		}
		//if they're valid update therm!
		else{
			User.findOneAndUpdate({username:username},{$set:{genre:genre,className:className}},{new: true},function(err,user){
				if(err){
					console.log("error updating user")
					res.send(error)
				}
				console.log("updated user: "+username)
				res.redirect("/")
			})
		}
	})

	return router

}