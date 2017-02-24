var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/Users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  Users.getActiveUsers(function(activeUsers) {
    console.log('active: ' + activeUsers);
    if (req.query.login) {
        console.log(req.query.login);
        res.render('loginFailed', {title: 'Job SearchLogin', active: activeUsers});
    } else
      res.render('login', { title: 'Job Search Login', active: activeUsers });
  })
});

router.get('/github', 
  passport.authenticate('github', {scope: ['user:email'], session: true}),
  function(req, res) {
  }
);

router.get('/github/callback',
  passport.authenticate('github', {failureRedirect: '/'}), 
  function(req, res) {
    res.redirect('/feed');
});

router.get('/logout', function(req, res) {
  res.clearCookie('search');
  res.clearCookie('location');
  req.logout();
  res.redirect('/');
});

module.exports = router;