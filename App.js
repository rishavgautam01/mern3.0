const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connect = require('./database/index')
connect()
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"This is a home page"
    })
})

app.listen(3000,()=>{
    console.log("App is running at port 3000")
})

// mongodb+srv://rishavgautam909:<db_password>@mern3.c0ejv.mongodb.net/?retryWrites=true&w=majority&appName=mern3

