const User =require('../../model/UserSchema')
const passport = require('passport')
const { models } = require('mongoose')
const jwt =require('jsonwebtoken')
// const User = require('../../model/UserSchema')
const CLIENT_URL  ="http://localhost:3000/"
const SecretKey ="wbsakjfveshgv@qwhj"




const loginPage =(req,res,next)=>{
     res.render('Login')
}
const loginuer =async(user)=>{
 
        const Data =await User.findOne({email:user.emails[0].value})  
                if(!Data){
                    console.log("vikas")
                    const NewUser = new User({
                        Name:user.displayName,
                        email:user.emails[0].value,
                        ProfilePic:user.photos[0].value
                        })
                        NewUser.save()
                        console.log(NewUser)
                        let token =jwt.sign({
                            UserId:NewUser.id,
                            Name:NewUser.Name,
                            email:NewUser.email
                        },SecretKey,{expiresIn :'2h'})
                }else{
                    let token =jwt.sign({
                        UserId:Data.id,
                        Name:Data.Name,
                        email:Data.email
                    },SecretKey,{expiresIn :'2h'})
                }
           
  
}


const logifailed =(req,res,next)=>{
    res.status(401).json({
               sucess: false,
               message:"failure"
           })
}



// module.exports.login=login
module.exports.logifailed=logifailed
module.exports.loginPage=loginPage
module.exports.loginuer=loginuer
