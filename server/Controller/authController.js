const User=require('../model/User');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Config=require('../configuration');

const AuthController={
    register:async (req,res)=>{
     try{
      const {username,email,password}=req.body;
      const newUser=new User({username,email,password});

      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hashed)=>{
            newUser.password=hashed;
            newUser
                  .save()
                  .then()
                  .catch(err=>{
                    console.error(err);
                    res.status()
                })
        })
      })
      const payload={id:newUser.id,username:username};
      const token=jwt.sign(payload,Config.secret,{expiresIn:'1h'});
      res.json({success:true,token:'Bearer '+token});
      
    }
    catch(error){
        res.status(500).json({message:'Registration Failed',error:error.message});
    }
   },

   login:async (req,res)=>{
      try{
           const {email,password}=req.body;
           User.findOne({email}).then((user)=>{
                if(!user) return res.status(400).json({message:'User Not Found'});

                bcrypt.compare(password,user.password,(err,isMatch)=>{
                   if(isMatch){
                    const payload={id:user.id,username:user.username};
                    const token=jwt.sign(payload,Config.secret,{expiresIn:'1h'});
                    res.json({success:true,token:'Bearer '+token});
                   }
                   else{
                    res.status(400).json({message:'Password Incorrect'});
                   }
                });
           })
      }
      catch(error){
        res.status(500).json({message:'Login failed',error:error.message});
      }
   },
   
   isUsernameExists:async(req, res)=>{
    try{
        const username=req.query.username;
        const user= await User.findOne({username});
        if (user) {
            res.status(200).json({ exists: true });
        }
        else {
            res.status(200).json({ exists: false });
        }
    }
    catch(error){
        res.status(500).json({message:'User exists checking failed',error:error.message});
    }
   },
   isEmailExists:async(req, res)=>{
    try{
        const email =req.query.email;
        const user= await User.findOne({email});
        if (user) {
            res.status(200).json({ exists: true });
        }
        else {
            res.status(200).json({ exists: false });
        }
    }
    catch(error){
        res.status(500).json({message:'User exists checking failed',error:error.message});
    }
   }
 
}

module.exports=AuthController;