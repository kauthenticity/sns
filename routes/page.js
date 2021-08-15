const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Post = require('../schemas/post');

router.get('/', async(req, res, next)=>{
  posts = await Post.find();
  console.log(posts);
  res.render('main', {title : 'development', isLoggedIn : req.user, posts : posts});
});

router.get('/:id', async (req, res, next)=>{
  const id = req.params.id;
  
  if(id !== 'favicon.ico'){
    var user=null;
    var post=null;
    user = await User.findOne({id : id});
    post = await Post.find({id : id});
  
    if(post.length===0){
      post = null;
    }
   
    res.render('profile', {title : 'myapp', isLoggedIn : req.user, user : user, posts : post})
  }

  
});

module.exports = router;