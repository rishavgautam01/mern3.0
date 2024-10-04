const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const connect = require('./database/index')
const Blog = require('./model/blogModel')
app.use(express.json())

connect() //connecting to the database


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"This is a home page"
    })
})
app.post('/blog',async(req,res)=>{
    const {title,subtitle,description,image} = req.body
    console.log(req.body)
    await Blog.create({
        title,
        subtitle,
        description,
        image
    })
    res.status(200).json({
        message:"Blog added successfully"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("App is running at port:",process.env.PORT)
})

// mongodb+srv://rishavgautam909:<db_password>@mern3.c0ejv.mongodb.net/?retryWrites=true&w=majority&appName=mern3

