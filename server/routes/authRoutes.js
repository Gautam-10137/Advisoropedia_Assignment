const express=require('express');
const router=express.Router();
const authController=require('../Controller/authController');

router.post('/signup',authController.register);
router.post('/login',authController.login);

router.get('/isUsernameExists',authController.isUsernameExists);
router.get('/isEmailExists',authController.isEmailExists);
module.exports= router;