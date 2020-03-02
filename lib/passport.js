const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../routes/users/models/Users')
const bcrypt = require('bcryptjs')

// this places the mongo user id into passport sesseion
passport.serializeUser((user,done)=>{
    done(null, user._id)
})

// gives us the req.user to use throughout the app
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})

//create login middleware
//local-login names the middleware


passport.use(
    'local-login',

    new LocalStrategy({
        usernameField:'email',
        passwordField:"password",
        passReqToCallback:true
    },(req,email,password,done)=>{
        User.findOne({email:req.body.email},(err,user)=>{
            if(err){
                console.log('Login error',err)
                return done(err,null)
            }

            if(!user){
                console.log('no user found',err)
                return done(null,false)
            }

        // unencrypt password and compare
            bcrypt.compare(password,user.password)
            .then(result=>{
                if(!result){
                    return done(null,false)
                }else{
                    return done(null,user)
                }
            }).catch(err => {
                throw err
            })
        })
    }
    )
)