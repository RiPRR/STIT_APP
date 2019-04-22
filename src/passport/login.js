const mongoose = require('mongoose');
const db = require('../db')
const User = mongoose.model('User')
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport){
	passport.use("login", new LocalStrategy({passReqToCallback: true},
		function(req,username,password,done){
			User.findOne({"username":username},function(err,user){
				if(err){
					console.log("Sorry an error occured")
					return done(err)
				}
				if(!user){
					console.log(username+" Is not a valid username,please try again")
					return done(null,false,req.flash("message","user not found"))
				}
				if(!isValidPassword(user,password)){
					console.log("Invalid password for User: "+username)
					return done(null,false,req.flash("message","invalid password"))
				}
				console.log("LOGGED IN AS: "+username)
				return done(null,user)
			})
		}
	))

	const isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	}
}
