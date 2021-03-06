const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
//must be below session
let MongoStore = require('connect-mongo')(session)
require('./lib/passport')
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/userRoutes');

const app = express();

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(()=>{
  console.log('Mongodb Connected')
}).catch(err=> console.log(`mongo error:${error}`))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//create session middleware
app.use(methodOverride('_method'))
app.use(session({
  resave:true,
  saveUninitialized:true,
  //requiered
  secret:process.env.Session_Secret,
  //store ifo in database
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect:true,
    cookie:{maxAge:60000}
   
  })

}))
//initialize passport module
app.use(passport.initialize())
// create session must be below session middleware
app.use(passport.session())
// locals allows us to create variables to use through out the app
app.use(
  (req,res,next)=>{
    // passport gives us the use of req.user which we define as user
    res.locals.user = req.user
    next()
  }
)


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
