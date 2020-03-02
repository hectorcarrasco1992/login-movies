const mongoose = require('mongoose')
// create blueprint for movies
const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        default:"",
        trim:true,
    },

    email:{
        type:String,
        unique:true,
        default:"",
        trim:true,
    },

    password:{
        type:String,
        trim:true,

    }
    
})

module.exports = mongoose.model('users',UserSchema)