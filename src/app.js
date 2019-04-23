const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require("path")
const sanitize = require("mongo-sanitize")
const passport = require("passport")
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const User = mongoose.model('User')
const flash = require('connect-flash');
const initPassport = require("./passport/init")
//const routes = require("./routes/index")(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({
	secret:"secretKey", 
	resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
const routes = require("./routes/index")(passport)
app.use("/",routes)


initPassport(passport)









app.listen(3000, () => {console.log("Server is listening on 3000")});