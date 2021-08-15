const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Post = require('../schemas/post');

router.get('/:id', (req, res, next)=>{
  const id = req.params.id;  
  const user = User.findOne({id : id}, (err)=>{
    if(err){
      console.error('error occured,', error);
      next(error);
    }
  }) ;
  const post = Post.find({id : id}, (err)=>{
    if(err){
      console.error('error occured,', error);
      next(error);
    }
  });

  console.log('post :', post);
  console.log('what?');

  if(post){
    res.render('profile', {title : user.username, isLoggiend : req.user, user : user, posts : post});
  }

});

module.exports = router;