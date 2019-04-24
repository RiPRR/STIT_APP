const express = require('express')
const app = express()
const db = require('./db');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const path = require("path")
const passport = require("passport")
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const initPassport = require("./passport/init")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({
	secret:"secretKey", 
	resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//initilize routing with passport auth
const routes = require("./routes/index")(passport)
app.use("/",routes)

//initiates Passport auth
initPassport(passport)

app.listen(3000, () => {console.log("Server is listening on 3000")})