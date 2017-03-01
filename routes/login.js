var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/Users.js');

/* GET login page. */
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

/**
 * OAuth passport login initiation.
 */
router.get('/github', 
  passport.authenticate('github', {scope: ['user:email'], session: true}),
  function(req, res) {
  }
);

/**
 * OAuth callback for github.
 */
router.get('/github/callback',
  passport.authenticate('github', {failureRedirect: '/'}), 
  function(req, res) {
    res.redirect('/feed');
});

/**
 * Logout a user and clears cookies.
 */
router.get('/logout', function(req, res) {
  res.clearCookie('search');
  res.clearCookie('location');
  req.logout();
  res.redirect('/');
});

module.exports = router;