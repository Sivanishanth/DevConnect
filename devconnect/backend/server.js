const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/auth')
const projectRoutes = require('./routes/project')
const commentRouters = require('./routes/comment')

const mongoose = require('mongoose')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes

app.use('/api/auth',authRoutes)
app.use('/api/project',projectRoutes)
app.use('/api/comments',commentRouters)

// Database Connection

mongoose.connect(process.env.MONGO_DB_URL)
.then(()=> console.log("Database Connected...."))
.catch((e)=>{
    console.log(e)
})

// Start the server
app.listen(process.env.PORT ,()=>{
    console.log("Server Running on port",process.env.PORT)
})