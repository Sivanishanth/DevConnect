const express = require('express')
const authController = require('../controllers/authController')
const User = require('../models/UserSchema')


const router = express.Router()

router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/users/:userId',async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId)
        res.json({data: user})
    }catch(err){
        res.json({err : err.message})
    }
})

module.exports = router