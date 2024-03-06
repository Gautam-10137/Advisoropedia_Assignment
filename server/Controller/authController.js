const User=require('../model/User');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Config=require('../configuration')

// register
exports.register=async (req,res)=>{
     try{
      const {username,email,password}=req.body;
      const newUser=new User({username,email,password});

      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hashed)=>{
            newUser.password=hashed;
            newUser
                  .save()
                  .then()
                  .catch(err=>console.error(err))
        })
      })
      res.json(newUser);
      
    }
    catch(error){
        res.status(500).json({message:'Registration Failed',error:error.message});
    }
}

// login
exports.login=async (req,res)=>{
      try{
           const {username,email,password}=req.body;
           User.findOne({username}).then((user)=>{
                if(!user) return res.status(400).json({message:'User Not Found'});

                bcrypt.compare(password,user.password,(err,isMatch)=>{
                   if(isMatch){
                    const payload={id:user.id,username:username};
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
}

exports.isUserExists= async(req, res)=>{
    try{
        const { username, email }=req.body;
        const user= await User.findOne({username,email});
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

exports.refreshToken=async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        jwt.verify(refreshToken, Config.refreshTokenSecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const accessToken = jwt.sign({ id: user.id, username: user.username }, Config.secret, { expiresIn: '1h' });
            res.json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Token refresh failed' });
    }
};

exports.resetPassword= async(req,res)=>{
    try{
       
    }
    catch(error){
        res.status(500).json({ message: 'Password reset failed' });
    }
}