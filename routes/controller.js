const express = require('express')
const Movie = require('./users/models/Movie')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../routes/users/models/Users')
// const methodOverride = require('method-override')
require('../lib/passport')
module.exports ={
    getMovieFunc: (req,res)=>{
        Movie.find({})
        .then((movie)=>{
          return res.status(200).json(movie)
        }).catch(err=>res.status(400).json('server error'))
      
      },
    
    postNewMovie:(req,res)=>{
          // validate input
        if(!req.body.title|| !req.body.rating||!req.body.synopsis||!req.body.release||!req.body.genre||!req.body.director||!req.body.box){
            return res.status(400).json({message:'all in puts must be filled'})
        }
          //check if box is unique
          //use the Movie model and the mongoose method to compare word in db to input word  respectively
        Movie.findOne({movie:req.body.box})
        .then((box)=>{
            // if the word is found  stop code and send message 
            if(box){
            return res.status(500).json({message:'box office sales should be unique'})
            }
        })


        //create movie to add
        
        //assign values to keys based on user input
        const newMovie = new Movie()
        newMovie.title = req.body.title
        newMovie.rating = req.body.rating
        newMovie.synopsis = req.body.synopsis
        newMovie.release = req.body.release
        newMovie.genre = req.body.genre
        newMovie.director = req.body.director
        newMovie.box = req.body.box
        
          //add movie to data base

          // .save() saves the new movie
        newMovie.save()
        .then((movie)=>{
            res.status(200).json({message:'success movie has been added',movie})
            })
            .catch((err)=>{
            return res.status(500).json({message:'movie not added',err})
            })

            .catch((err)=>{
            return res.status(500).json({message:'server error',err})
            })
        
        
    },
    
    updateMovie:(req,res)=>{
        // find movie based on parameters
        Movie.findOne({title:req.query.title})
        .then((movie)=>{
            if(movie){
                //redefine definition 
                movie.title = req.body.title?req.body.title:movie.title
                //save definition
                //save movie
                movie.save()
                .then(updated=>{
                    return res.status(200).json({message:'title has been updated',updated})
                }).catch(err => res.status(418).json({message:'title not updated',err}))
            }else{
                return res.status(200).json({message:'movie does not exist'})
            }
        }).catch((err)=> res.status(500).json({message:'server error',err}))
    },

    updateMovieRender: (req,res)=>{
        res.render('updateMovie')
    },

    deleteMovie:(req,res)=>{
        Movie.findOneAndDelete({title:req.params.title})
        .then((movie)=>{
            if(movie){
                return res.status(200).json({message:'movie deleted'})
            }else{
                return res.status(200).json({message:'no movie to delete'})
            }
        }).catch(err => res.status(400).json({message:"movie not deleted",err}))

    },
    
    getAllMoviesRender :(req,res)=>{
       

            Movie.find({})
            .then(movie =>{
                //return res.status(200).json(words)
                console.log(movie)
                
                return res.render('success',{movie})
            })
        
    },

    findMovieRender: (req,res)=>{
        return res.render('findMovie',{movie:null})
    },
    
    addMovieRender:(req, res, next)=> {
        res.render('addMovie',{Movie:null});
    },

    findMovie: (req,res)=>{
        return res.render('findMovie',{movie:null})
        },

    foundMovieFunc:(req,res)=>{
        // find the movie based on  searchbox query in findWord.ejs
        // after the find one make sure you match which input the search will based on
        // so title:req.query.title will search based on the title they put in the title box
        Movie.findOne({title:req.query.title})
        .then((movie)=>{
        if(movie){
            return res.render('findMovie', {movie})
        }else{
            return res.status(400).json({message:'no movie found',err})
        }
        }).catch(err => res.status(500).json({message:'server error',err}))
    },

    updateEmailFunc : (req,res)=>{
        const {id} = req.params
        // search for user based on parameters
        User.findById(id)
        .then((user)=>{
          if(user){
            // fill in values for keys based  on input if no input keep as same 
            user.name = req.body.name?req.body.name:user.name
            user.email= req.body.email?req.body.email:user.email
      
            user.save()
            .then((user)=>{
              res.status(200).json({message:'user updated',user})
            }).catch(err=>res.status(400).json({message:'user not updated',err}))
          }
        }).catch(err => res.status(400).json({message:'User not Found',err}))
    },

    getAllUsersFunc:(req,res)=>{
        User.find({})
        .then(users=>{
        return res.status(200).json({message:'success',users})
        }).catch((err)=>res.status(200).json({message:'server error',err}))
    },

    logOutFunc: (req,res)=>{
        //get rid of session
        req.session.destroy()
        console.log(req.session)
        req.logout()
        return res.redirect('/users/login')
    },

    // loginFunc: passport.authenticate('local-login',{
    //     successRedirect:'/',
    //     failureRedirect:'/fail',
    //     // failureFlash:true,
    // }) ,
    // successRender: (req,res)=>{
    //     // isAuthenticated() makes sure the user has logged on in order to access site
        
    //     return res.render('success')
        
        
    // },

      myValidation:(req,res,next)=>{
        if(!req.body.name||!req.body.email||!req.body.password){
        return res.json({message:'all inputs must be filled'})}
        next()
    },

    registerUserFunc : (req, res, next) =>{
  
        //check if user exists
          User.findOne({email:req.body.email})
          .then((user)=>{
            if(user){
              return res.status(400).json({message:'user already exist'})
            }
        //create new user from model
            const newUser = new User()
        // create encrypt password
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password,salt)
        // set values for the user
            newUser.name = req.body.name
            newUser.email = req.body.email
            newUser.password = hash
            
            newUser.save()
            .then((user)=>{
              return req.logIn(user,(err)=>{
                if(err) res.status(500).json({message:'server error'})
                else{
                  console.log(req.session)
                  res.redirect('/success')
                }
              })
            })
            .catch(err=>res.status(400).json({message:'user not created',err}))
            
          }).catch(err => res.status(418).json({message:'we done a-aron',err}))
        
    },

    logInRender: (req,res)=>{
        return res.render('login')
    },

    failRender:(req,res)=>{
        
        return res.render('fail')
    },

    indexRender: (req,res)=>{
        
            res.render('index')
        
    }
}