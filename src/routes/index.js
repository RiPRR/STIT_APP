const express =require("express")
const router = express.Router()

/*
const isAuthenticated = function(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/")
}
*/
module.exports = function(passport){

	router.get("/",(req,res)=>{
		res.send("homepage")
	});

	router.get("/success",(req,res)=>{
		res.send("success!")
	});

	router.get("/failure",(req,res)=>{
		res.send("FUCK")
	});

	router.post("/register",passport.authenticate("register",{
		successRedirect:"/success",
		failureRedirect:"/failure",
		failureFlash:true
	}))

	router.post("/login",passport.authenticate("login",{
		successRedirect:"/success",
		failureRedirect:"/failure",
		failureFlash:true
	}))

	router.get("/getEvents",(req,res)=>{
		
	});

	router.post("/setPrefrences",(req,res)=>{
		
	});

	return router
}