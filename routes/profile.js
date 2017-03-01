/** 
 * Author: Jason Runzer
 * profile.js
 * 3/1/2017
 * Profile route to handle fetching a user's profile and saving a users profile.
 */

var express = require('express');
var router = express.Router();
var util = require('../util.js');
var Users = require('../models/Users.js');

/* GET profile page. */
router.get('/', util.checkLogin, function(req, res, next) {
  res.render('profile', { title: 'Profile', username: req.user.username });
});

/**
 * Saves a users location and search preference to their profile in the database.
 */
router.post('/save', util.checkLogin, function(req, res, next) {
  Users.updateProfile(req.user.id, req.body.search, req.body.location, function(success) {
    if (success) {
      res.cookie('location', req.body.location);
      res.cookie('search', req.body.search);
      res.sendStatus(200);
    } else 
      res.sendStatus(407);
  });
});

module.exports = router;