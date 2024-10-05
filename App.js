const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const connect = require('./database/index')
const Blog = require('./model/blogModel')
const {multer,storage} = require('./middleware/multerConfig')
app.use(express.json())
const upload = multer({storage:storage})
connect() //connecting to the database


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"This is a home page"
    })
})
//const title = req.body.title //const subtitle = req.body.subtitle
app.post('/blog',upload.single('image'),async(req,res)=>{
    const {title,subtitle,description,image} = req.body
    if(!title || !subtitle || !description){
        return res.status(400).json({
            message:"Please enter title,subtitle,description."
        })
    }
    await Blog.create({
        title:title,
        subtitle:subtitle,
        description:description
    })
    res.status(200).json({
        message:"Blog added successfully"
    })
})



app.listen(process.env.PORT,()=>{
    console.log("App is running at port:",process.env.PORT)
})

// mongodb+srv://rishavgautam909:<db_password>@mern3.c0ejv.mongodb.net/?retryWrites=true&w=majority&appName=mern3

