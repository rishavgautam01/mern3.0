const mongoose = require('mongoose')

async function connectToDatabase(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to database")
}

module.exports = connectToDatabase