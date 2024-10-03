const express = require('express')
const app = express()

app.get("/",(req,res)=>{
    res.json({
        message:"This is a home page"
    })
})


app.listen(3000,()=>{
    console.log("App is running at port 3000")
})

