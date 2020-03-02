const mongoose = require('mongoose')
// create blueprint for movies
const MovieSchema  = new mongoose.Schema({
    title:{type:String,unique:true,default:'',lowercase:true,trim:true},
    rating:{type:String,default:"",trim:true},
    synopsis:{type:String,default:"",trim:true,lowercase:true},
    release:{type:String,default:"",trim:true},
    genre:{type:String,default:"",trim:true,lowercase:true},
    director:{type:String,default:"",trim:true,lowercase:true},
    box:{type:String,default:"",trim:true,unique:true},
    
})

module.exports = mongoose.model('movie',MovieSchema)