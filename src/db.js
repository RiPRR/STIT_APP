const mongoose = require('mongoose');
const URLSlugs = require("mongoose-url-slugs");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const userSchema = new mongoose.Schema({
	username:{type:String,required:true},
	password:{type:String,required:true},
	className:{type:String,required:true},
	genre:{type:String,required:true}
});
mongoose.model("User",userSchema)
const User = mongoose.model("User")
mongoose.connect('mongodb://localhost/stitDB', {useNewUrlParser: true});