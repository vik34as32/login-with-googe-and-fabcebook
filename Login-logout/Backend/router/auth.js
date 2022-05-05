const router = require('express').Router()
const IsAuthentication =require('../middleware/isAuthentication')
const UserController = require('../Controllers/UserControllers/UserControllers')

const passport = require('passport')
const User = require('../model/UserSchema')
const { route } = require('.')
const CLIENT_URL  ="http://localhost:5000/api/"



 router
     .route('/loginUser')
     .get(UserController.loginPage)
    

// router .route('/login/sucess') .get(UserController.login)


router
    .route('/login/failed')
    .get(UserController.logifailed)

 router.get('/logout',(req,res)=>{
    req.session = null;
    req.logout();
    res.redirect("http://localhost:5000/auth/loginUser");
 })




router.get('/google',passport.authenticate('google', { scope: ['profile','email']}))


router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    })
  );

 


module.exports =router