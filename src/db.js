const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const userSchema = new mongoose.Schema({
	username:{type:String,required:true},
	password:{type:String,required:true},
	className:{type:String,required:true},
	genre:{type:String,required:true}
})
mongoose.model("User",userSchema)
const User = mongoose.model("User")

//replace dbstring with your own DB address if you'd like
mongoose.connect('mongodb://localhost/stitDB', {useNewUrlParser: true})