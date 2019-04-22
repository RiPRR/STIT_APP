const mongoose = require('mongoose');
const db = require('../db')
const User = mongoose.model('User')
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport){
	passport.use('register', new LocalStrategy({passReqToCallback:true},
	function(req,username,password,done){
		createUser = function(){
			User.findOne({"username":username},function(err,user){
				if(err){
					console.log(err)
					return done(err)
				}
				if(user){
					console.log("User: "+username+" already exists, please try again")
					return done(null,false,req.flash("message","user already exists"))
				}
				else{
					const hashedpassword = hash(password)
					const newUser = new User({username:username,password:hashedpassword});
					newUser.save(function(err){
						if(err){
							console.log("Error saving new user")
							console.log(err)
							throw err
						}
						else{
							console.log("REGISTERED "+username+" AS NEW USER")
							return done(null,newUser)
						}
					})					
				}
			})
		}
		process.nextTick(createUser);
	})
	)

	const hash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}
