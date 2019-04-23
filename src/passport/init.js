const mongoose = require('mongoose');
const db = require('../db')
const User = mongoose.model('User')
const register = require("./register")
const login = require("./login")
module.exports = function(passport){
	passport.serializeUser(function(user,done){
		//console.log("serializing: "+user["username"])
		done(null,user._id)
	})
	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			//console.log("deserializing: "+user["username"])
			console.log("----------------------------------")
			done(err,user)
		})
	})
	login(passport)
	register(passport)
}
