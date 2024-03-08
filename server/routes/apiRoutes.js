const express=require('express');
const router=express.Router();
const authRoutes=require('./authRoutes');
const PostController=require('../Controller/postController');
const jwt=require('jsonwebtoken');
const Config=require('../configuration')

function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, Config.secret, (err, user) => {
      if (err) return res.sendStatus(403);  
      next();
    });
  }

router.use('/auth',authRoutes);
router.get('/posts',authenticateToken,PostController.GetPosts);

module.exports= router;