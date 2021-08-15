const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/user');
module.exports = ()=>{
  passport.use(new LocalStrategy({
    usernameField : 'id',
    passwordField : 'password',
  },async(id, password, done)=>{
    try{
      const exUser = await User.findOne({id : id});
      if(exUser){
        if(exUser.password === password){
          done(null, exUser);
        }
        else{
          done(null, false, {message : 'Wrong password'});
        }
      }else{
        done(null, false, {message : 'No such user exists'});
      }

    }catch(error){
      console.error(error);
      done(error);
    }
  }))
}