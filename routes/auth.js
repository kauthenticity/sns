const express = require('express');
const passport = require('passport');
const User = require('../schemas/user');
const router = express.Router();

router.get('/join', (req, res, next)=>{
  res.render('join', {title : 'my app - join', isLoggedIn :req.user,});
});

router.get('/join/local', (req, res, next)=>{
  res.render('join_local', {title : 'my app - join', isLoggedIn : req.user,});
});

router.post('/join/local', async (req, res, next)=>{
  const {username, id, password} = req.body;
  await User.create({
    username : username,
    id : id,
    password : password,
  });
  res.redirect('/');
});

router.get('/login', (req, res, next)=>{
  res.render('login', {title : 'myapp - login', isLoggedIn : req.user});
}).post('/login', (req, res, next)=>{
  passport.authenticate('local', (authError, user, info)=>{
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      res.redirect(`/auth/login/Eror=${info.message}`);
    }
    req.logIn(user, (loginError)=>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    })
  })(req, res, next);
});

router.get('/logout', async(req, res, next)=>{
  req.logOut();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;