const express = require('express');
const router = express.Router();
const Movie = require('./users/models/Movie')
const controllerFunc = require('./controller')


/* GET home page. */
// router.get('/', function(req, res, next) {
//   if(req.isAuthenticated()){

//     res.render('index');
//   }
// });


// use controller function for postman

router.get('/',(req,res)=>{
    res.render('landing')
})
router.get('/movies',controllerFunc.getMovieFunc)
router.post('/addmovie',controllerFunc.postNewMovie)
router.put('/:title',controllerFunc.updateMovie)
router.delete('/:title',controllerFunc.deleteMovie)


module.exports = router;
