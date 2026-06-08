const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : {type : String, required : true },
    userName : {type : String, required : true, unique : true },
    email : {type : String, required : true , unique : true},
    password : {type : String, required : true},
    about : {type : String,default:""},
    skills : [{type : String}],
    githubLink : {type : String},
    linkedinLink : {type : String},
    profileImage : {type : String, default : "defaultProfile-url.png"}
},{
    timestamps : true
}
)

const User = mongoose.model('User',UserSchema)
module.exports = User