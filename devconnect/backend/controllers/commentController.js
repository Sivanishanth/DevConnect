const Comment = require('../models/CommentSchema')
const mongoose = require('mongoose')
const projects = require('../models/ProjectSchema')

const createComment = async (req,res)=>{
    try{
        const newComment = await Comment.create(
            {...req.body , userID : req.user.userId}
        )
        res.status(201).json({message : "Comment created" , data : newComment})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

const getComment = async (req,res)=>{
    try
    {
        const commentProject = await Comment.find({projectID : req.params.projectId}).populate('userID','name userName')
        res.status(200).json({message : "Comments" , data : commentProject})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
    
}

const deleteComment = async (req,res)=>{
    try{
        const deleteComments = await Comment.findById(req.params.id)
        if(!deleteComments){
            return res.status(404).json({message : 'Comment not found'})
        }
        if(!deleteComments.userID.equals(req.user.userId)){
            return res.status(403).json('Not Authorised to delete this comment')
        }
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "Deleted Comment"})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

module.exports = {
    createComment,
    getComment,
    deleteComment
}
