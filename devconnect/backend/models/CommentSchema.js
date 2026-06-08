const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
    {
        userID : {type : mongoose.Schema.Types.ObjectId , ref : 'User' },
        projectID : {type : mongoose.Schema.Types.ObjectId , ref : 'Project'},
        commentContent : {type : String , required : true},
    },{
        timestamps : true
    }
)

const Comment = mongoose.model('Comment',CommentSchema)
module.exports = Comment