const projects = require('../models/ProjectSchema')
const mongoose = require('mongoose')


// Create New Project
const createProject = async (req,res)=>{
    try{
        const newProject = await projects.create({
            ...req.body, userID: req.user.userId
        })
        res.status(201).json({message : "Created Project",data : newProject})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

// Get All Projects 
const getAllProject = async (req,res)=>{
    try{
        const getAllProjects = await projects.find().sort({createdAt : -1}).populate('userID', 'name email githubLink linkedinLink profileImage')
        res.status(200).json({message : 'Fetched Projects' , data : getAllProjects})
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

//Get Single Project
const getProjectById = async (req,res)=>{
    try{
        const id = req.params.id
        const getProjectsById = await projects.findById(id).populate('userID', 'name email githubLink linkedinLink profileImage')
        if(!getProjectsById){
            return res.status(404).json({message : "Project not found"})
        }
        res.status(200).json(getProjectsById)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

//Update Project 
const updateProject = async (req,res)=>{
    try {
        const id = req.params.id
        const update = req.body
        const project = await projects.findById(id)
        if(!project){
            return res.status(404).json("Project Not Exist")
        }
        if(!project.userID.equals(req.user.userId)){
            return res.status(403).json('Not authorized to modify this project')
        }
        const updatedProject = await projects.findByIdAndUpdate(id,update,{new:true})
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

//Delete Project By ID
const deleteProjects = async (req,res)=>{
    try{
        const id = req.params.id 
        const project = await projects.findById(id)
        if(!project){
            return res.status(404).json('Project Not found')
        }
        if(!project.userID.equals(req.user.userId)){
            return res.status(403).json('Not Authorized to delete this project')
        }
        const deleteProject = await projects.findByIdAndDelete(id)
        res.status(200).json('Deleted Project Successfully')
    }catch(err){
        res.status(500).json({message : err.message})
    }
}

//Like The Post
const likeProject = async (req,res)=>{
    try{
        const id = req.params.id
        const userId = req.user.userId

        const project = await projects.findByIdAndUpdate(id)
        if(!project){
            return res.status(404).json({message : 'Project not Found'})
        }

        const alredyLiked = project.likes.includes(userId)
        let updateProject
        if(alredyLiked){
            updateProject = await projects.findByIdAndUpdate(id, {$pull : {likes : userId}},{new : true})
        }
        else{
            updateProject = await projects.findByIdAndUpdate(id, {$addToSet : {likes : userId}},{new : true})
        }
        res.status(200).json({data : updateProject})

    }catch(err){
        res.status(500).json({message : err.message})
    }
}

module.exports = {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProjects,
    likeProject
}
