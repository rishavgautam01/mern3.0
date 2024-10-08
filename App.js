//We are following restful api convention


const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const connect = require('./database/index')
const Blog = require('./model/blogModel')
const {multer,storage} = require('./middleware/multerConfig')
app.use(express.json())
app.use(express.static('storage'))
const upload = multer({storage:storage})
const fs = require('fs')
connect() //connecting to the database


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"This is a home page"
    })
})
//const title = req.body.title //const subtitle = req.body.subtitle
app.post('/blog',upload.single('image'),async(req,res)=>{
    const {title,subtitle,description} = req.body
    console.log(req.file)
    const {filename} = req.file
    if(!title || !subtitle || !description){
        return res.status(400).json({
            message:"Please enter title,subtitle,description."
        })
    }
    await Blog.create({
        title:title,
        subtitle:subtitle,
        description:description,
        image:filename
    })
    res.status(200).json({
        message:"Blog added successfully"
    })
})

app.get('/blog',async(req,res)=>{
    const blogs = await Blog.find()   //returns array
    if(blogs.length === 0){
        return res.status(400).json({
            message:"No data found"
        })
    }
    res.status(200).json({
        message:"Successfully fetched data",
        data:blogs
    })
})

app.get('/blog/:id',async(req,res)=>{
    const{id} = req.params
    const blog = await Blog.findById(id)
    if(!blog){
        return res.status(400).json({
            message:"No data found"
        })
    }
    res.status(200).json({
        message : "Blog fetched",
        data: blog
    })
})

app.delete('/blog/:id',async(req,res)=>{
    const {id} = req.params
    const blog = await Blog.findById(id)
    const imageName = blog.image
    await Blog.findByIdAndDelete(id)
    fs.unlink(`./storage/${imageName}`,(err,succ)=>{
        if(err){
            console.log(err)
        }else{
            console.log("File deleted successfully")
        }

    })
    res.status(200).json({
        message:"Deleted successfully."
    })
})

app.patch('/blog/:id',upload.single('image'),async(req,res)=>{
    const {id} = req.params
    const {title,subtitle,description} = req.body
    const blog = await Blog.findById(id)
    const fileName = blog.image
    let image;
    if(req.file){
        fs.unlink('./storage/'+fileName,(err,succ)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("Deleted old file.")
            }
        
        })
        image = req.file.filename
        
    }
    await Blog.findByIdAndUpdate(id,{
        title,
        subtitle,
        description,
        image
        
    })
    res.status(200).json({
        message:"Updated successfully."
    })
})


app.listen(process.env.PORT,()=>{
    console.log("App is running at port:",process.env.PORT)
})

// mongodb+srv://rishavgautam909:<db_password>@mern3.c0ejv.mongodb.net/?retryWrites=true&w=majority&appName=mern3

