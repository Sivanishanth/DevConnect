const jwt = require('jsonwebtoken')

const protect = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1] || req.headers.authorization
    console.log("Auth header:", req.headers.authorization)
    console.log("Token:", token)
    if(!token){
        return res.status(401).json({
            message : 'no such token'
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        res.status(401).json({
            message : err.message
        })
    }
    
}


module.exports = protect