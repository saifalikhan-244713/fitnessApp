const mongoose = require('mongoose')

const credrtialsSchema = new mongoose.Schema({
    email:String,
    password:String
})

const credential = mongoose.model("credential", credrtialsSchema)
module.exports = credential

