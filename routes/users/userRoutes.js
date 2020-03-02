const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('./models/Users')
const passport = require('passport')
const controllerFunc = require('../controller')
//const Movie = require('./models/Movie')
require('../../lib/passport')


/* GET users listing. */
//REGISTER WITHOUT PASSPORT
// router.post('/register', (req, res, next) =>{
// //validate input
//   if(!req.body.name||!req.body.email||!req.body.password){
//     return res.json({message:'all inputs must be filled'})
//   }
// //check if user exists
//   User.findOne({email:req.body.email})
//   .then((user)=>{
//     if(user){
//       return res.status(400).json({message:'user already exist'})
//     }
// //create new user from model
//     const newUser = new User()
// // create encrypt password
//     const salt = bcrypt.genSaltSync(10)
//     const hash = bcrypt.hashSync(req.body.password,salt)
// // set values for the user
//     newUser.name = req.body.name
//     newUser.email = req.body.email
//     newUser.password = hash
    
//     newUser.save()
//     .then((user)=>{
//       return res.status(200).json({message:'user has been created',user})
//     })
//     .catch(err=>res.status(400).json({message:'user not created',err}))
    
//   }).catch(err => res.status(418).json({message:'we done a-aron',err}))

// });

//REGISTER WITH PASSPORT
// validation middleware

router.get('/addmovie',controllerFunc.addMovieRender)
router.get('/',controllerFunc.indexRender)
router.get('/findmovie',controllerFunc.findMovie)
router.get('/foundmovie',controllerFunc.foundMovieFunc)
router.put('/update/:id',controllerFunc.updateEmailFunc)
router.get('/',controllerFunc.getAllUsersFunc)
router.get('/logout',controllerFunc.logOutFunc)
router.get('/success',controllerFunc.getAllMoviesRender)
router.get('/updatemovie',controllerFunc.updateMovieRender)
// router.post('/login',controllerFunc.loginFunc)
router.get('/login',controllerFunc.logInRender)
router.get('/fail',controllerFunc.failRender)
router.post('/register',controllerFunc.myValidation,controllerFunc.registerUserFunc)


// const myValidation = (req,res,next)=>{
//   if(!req.body.name||!req.body.email||!req.body.password){
//     return res.json({message:'all inputs must be filled'})}
//     next()
//   }
  

// router.post('/register', myValidation,(req, res, next) =>{
  
//   //check if user exists
//     User.findOne({email:req.body.email})
//     .then((user)=>{
//       if(user){
//         return res.status(400).json({message:'user already exist'})
//       }
//   //create new user from model
//       const newUser = new User()
//   // create encrypt password
//       const salt = bcrypt.genSaltSync(10)
//       const hash = bcrypt.hashSync(req.body.password,salt)
//   // set values for the user
//       newUser.name = req.body.name
//       newUser.email = req.body.email
//       newUser.password = hash
      
//       newUser.save()
//       .then((user)=>{
//         return req.logIn(user,(err)=>{
//           if(err) res.status(500).json({message:'server error'})
//           else{
//             console.log(req.session)
//             res.redirect('/users/success')
//           }
//         })
//       })
//       .catch(err=>res.status(400).json({message:'user not created',err}))
      
//     }).catch(err => res.status(418).json({message:'we done a-aron',err}))
  
//   });
  
//OLD LOGIN WITHOUT PASSPORT
// router.post('/login',(req,res)=>{
//   const{email,password}= req.body
//   if(!{email}||!{password}){
//     return res.status(200).json({message:'all inputs must be filled'})
//   }})

//   User.findOne({email})
//   .then((user)=>{
//     bcrypt.compare(password,user.password)
//     .then((result)=>{
//       if(!result){
//         return res.status(200).json({message:'incorrect credentials'})
//       }else{
//         return res.status(200).json({message:'you are now logged in'})
//       }
//     }).catch(err=>res.status(400).json({message:'incorrect credentials',err}))
//   })
// })

//PASSPORT LOGIN
router.post('/login',
  //authenticate using local login from passport file
  passport.authenticate('local-login',{
    successRedirect:'/',
    failureRedirect:'/fail',
    // failureFlash:true,
  })
)
// router.put('/update/:id',(req,res)=>{
//   const {id} = req.params
//   // search for user based on parameters
//   User.findById(id)
//   .then((user)=>{
//     if(user){
//       // fill in values for keys based  on input if no input keep as same 
//       user.name = req.body.name?req.body.name:user.name
//       user.email= req.body.email?req.body.email:user.email

//       user.save()
//       .then((user)=>{
//         res.status(200).json({message:'user updated',user})
//       }).catch(err=>res.status(400).json({message:'user not updated',err}))
//     }
//   }).catch(err => res.status(400).json({message:'User not Found',err}))
// })

//get all users
// router.get('/',(req,res)=>{
//   User.find({})
//   .then(users=>{
//     return res.status(200).json({message:'success',users})
//   }).catch((err)=>res.status(200).json({message:'server error',err}))
// })


// router.get('/logout',(req,res)=>{
//   //get rid of session
//   req.session.destroy()
//   console.log(req.session)
//   req.logout
//   return res.redirect('/')
// })

// router.get('/success',(req,res)=>{
//   // isAuthenticated() makes sure the user has logged on in order to access site
//   if(req.isAuthenticated()){
//     return res.render('success')
//   }else{
//     res.send('Unauthorized')
//   }
// })

// router.get('/fail',(req,res)=>{
//   return res.render('fail')
// })

module.exports = router;
