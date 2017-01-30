var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var usernameStatus;

var username;
var first_name;
var last_name;
var email;
var password;
var loginStatus;


router.get('/register', function(req, res) {
    var data = {
      title: 'Sign Up',
      status: usernameStatus,
      username: username,
      firstName: first_name,
      lastName: last_name,
      email: email,
      password: password
    }
    res.render('sign_up', data);
    usernameStatus = "";
    username = "";
    first_name = "";
    last_name = "";
    email = "";
    password = "";
});

router.post('/register', function(req, res) {
  username = req.body.username;
  first_name = req.body.firstName;
  last_name = req.body.lastName;
  email = req.body.email;
  password = req.body.password;

  var newAccount = {
    username: username,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password
  };

  User.getUserByUsername(newAccount.username, function(err, getUsername){
    if(!getUsername) {
      var newUser = new User(newAccount);
      //Register New User
      User.createUser(newUser, function(err, user){
        if(err) throw err;
      });
      res.redirect('/auth/login');
      
      usernameStatus = "";
      username = "";
      first_name = "";
      last_name = "";
      email = "";
      password = "";
    }
    else {
      console.log(getUsername)
      usernameStatus = 'Username already exist';
      res.redirect('/auth/register');
    }
  });
});

router.get('/login', function(req, res) {
  console.log();
    var data = {
      title: 'Login',
      loginStatus: loginStatus
    }
    res.render('login', data);
    loginStatus = "";
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user) {
        console.log('No User');
        loginStatus= "Incorrect Username or Password";
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err,  isMatch){
        if(err) throw err;
        if(isMatch) {
          loginStatus = "";
          return done(null, user);
        }
        else {
          loginStatus= "Incorrect Username or Password";
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/auth/login'}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();

  res.redirect('/')
})

module.exports = router;