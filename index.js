const express = require('express');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./schemas');

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const passportConfig = require('./passport');

const app = express();
app.set('port', 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch : true,
}); 
passportConfig();

connectDB();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use('/profile', express.static(path.join(__dirname, 'profile')));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : 'cat',
  cookie : {
    httpOnly : true,
    secure : false,
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.listen(app.get('port'), ()=>{
  console.log('app is listening to port 3000');
});