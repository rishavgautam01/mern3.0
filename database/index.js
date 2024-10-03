const mongoose = require('mongoose')

async function connectToDatabase(){
    await mongoose.connect('mongodb+srv://rishavgautam909:helloworld@mern3.c0ejv.mongodb.net/?retryWrites=true&w=majority&appName=mern3')
    console.log("Connected to database")
}

module.exports = connectToDatabase