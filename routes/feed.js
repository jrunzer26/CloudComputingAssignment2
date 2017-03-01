/** 
 * Author: Jason Runzer
 * feed.js
 * 3/1/2017
 * Feed route to handle getting jobs based on a users location and search.
 */

var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var util = require('../util.js');
var Users = require('../models/Users.js');

/* GET feed page. */
router.get('/', util.checkLogin, function(req, res, next) {
  //console.log(req.user);
  Users.getUser(req.user.id, function(data) {
    if (data.length == 0 || data[0].location == null) {
      res.redirect('/profile');
    } else {
      res.cookie('location', data[0].location);
      res.cookie('search', data[0].search);
      res.render('feed', { title: 'Job Feed' });
    }
  });
});

/**
 * Get job positions from github jobs based on location, description.
 */
router.post('/positions', util.checkLogin, function(req, res, next) {
  var des = req.body.des;
  var location = req.body.location;
  console.log(des);
  console.log(location);
  var options = {
    uri: 'https://jobs.github.com/positions.json?description='+des+'&location='+location,
    json: true
  };
  rp(options).then(function(result) {
    return res.status(200).send(result);
  })
  .catch(function (err) {
    return res.status(407).send({err: "An internal error occured. Try again later."})
  });
});

module.exports = router;