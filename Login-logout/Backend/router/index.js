const router =require('express').Router()
const { check } = require('express-validator')
const { route } = require('express/lib/application')
const customcontroller =require('../Controllers/IndexControlres')
const IsAuthentication =require('../middleware/isAuthentication')



router
    .route('/')
    .get(
      IsAuthentication,
      customcontroller.getPage
      )

router
    .route('/oders') 
    .get(
        IsAuthentication,
        customcontroller.getOders
    )     


router 
     .route('/about')
     .get(customcontroller.About)

router
   .route('/contact')    
   .get(customcontroller.Contact) 


router
    .route('/')
    .post(
        [
            check('Neck').isInt().withMessage('Neck value Must be a integer number'),
            check('Shoulder').isInt().withMessage('Shoulder value Must be a integer number'),
            check('Chest').isInt().withMessage('Chest value Must be a integer number'),
            check('Arm').isInt().withMessage('Arm value Must be a integer number'),
            check('Length').isInt().withMessage('Length value Must be a integer number'),
            check('Width').isInt().withMessage('Width value Must be a integer number'),
            check('Wrist').isInt().withMessage('Width value Must be a integer number'),

        ],
        IsAuthentication,
        customcontroller.Add
        )



router
    .route('/address')   
    .post(IsAuthentication,customcontroller.addAdresss) 
    .get(IsAuthentication,customcontroller.addressGet)
    .patch(IsAuthentication,customcontroller.UpdateAddress)


router
    .route('/profile')
    .get(IsAuthentication,customcontroller.profile)    




    module.exports=router