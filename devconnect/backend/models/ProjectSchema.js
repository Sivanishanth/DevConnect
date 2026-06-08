const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    userID : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
    title : {type : String, required : true},
    description : {type : String, required : true},
    techStack : [{type : String , required : true}],
    githubLink : {type : String, required : true},
    liveDemo : {type : String, required : true},
    images : [{type : String, required : true}],
    likes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},{timestamps : true})

const Project = mongoose.model('Project',ProjectSchema)
module.exports = Project