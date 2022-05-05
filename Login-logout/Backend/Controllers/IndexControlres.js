const Sizes = require('../model/SizeSchema')
const Address =require('../model/AddressSchema')
const  validationResult  = require('express-validator');
const loginuer =require('../Controllers/UserControllers/UserControllers').loginuer;
const res = require('express/lib/response');


const Add =async(req,res,next)=>{
     try{

            const newSize = new Sizes(req.body)
            newSize.save()
            res.send(newSize)
     }catch(err){
         res.sendStatus(500)
     }
}


const oderProduct=async(req,res,next)=>{
    try{
         const id =req.query.id
         const email =req.query.email
         const prodctData = await Sizes.findOne({_id:id})
         const addressData = await Address.findOne(email)
         res.status(201).json({
             status:"Sucess",
             message:"OderPlaced SucessFully",
             prodctData,
             addressData    
         })
    }catch(err){
        res.sendStatus(500)
    }
}


const addAdresss =(req,res,next)=>{
        try{
            const newAddress = new Address(req.body)
            newAddress.save()
            res.send(newAddress)
       }catch(err){
          res.sendStatus(500)
       }
}


const addressGet =async(req,res,next)=>{
     try{
           const address =  await Address.find()
           res.status(201).json({
               status:"Sucess",
               message:"Data Read Sucessfully",
               data:address
           })
     }catch(err){
         res.sendStatus(500)
     }
}


const UpdateAddress =async(req,res,next)=>{
     try{
        let PhoneNumber =req.query.PhoneNumber
        const addresss = await Address.findOneAndUpdate(PhoneNumber,req.body,{
            new:true
        })
        res.status(201).json({
            status:"sucess",
            data:addresss
        })
     }catch(err){
            res.sendStatus(500)
     }
}


const profile =(req,res,next)=>{
    res.render('profile',{
        user:req.user
    })
}


const About =(req,res,next)=>{
    res.render('About')
}

const Contact =(req,res,next)=>{
    res.render('contact')
}


const getPage =(req,res,next)=>{
    loginuer(req.user)
    res.render('home')
}

const getOders =(req,res,next)=>{
    res.render('oder')
}

module.exports.Add=Add
module.exports.addAdresss=addAdresss
module.exports.addressGet=addressGet
module.exports.UpdateAddress =UpdateAddress
module.exports.oderProduct=oderProduct
module.exports.profile=profile
module.exports.About =About
module.exports.Contact =Contact
module.exports.getPage =getPage
module.exports.getOders=getOders