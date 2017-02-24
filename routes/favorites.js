var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var util = require('../util.js');
var pgp = require('pg-promise')();
var Users = require('../models/Users.js');

/* GET home page. */
router.get('/', util.checkLogin, function(req, res, next) {
  res.render('favorites', { title: 'Favorites' });
});

/**
 * data: {userID: '1212'}
 */
router.get('/getAll', util.checkLogin, function(req, res, next) {
  Users.getFavorites(req.user.id, function(data) {
    res.status(200).json(data);
  });
});

router.post('/getAJob', util.checkLogin, function(req, res, next) {
  var options = {
        uri: 'https://jobs.github.com/positions/'+req.body.jobID+'.json',
        json: true
  };
  console.log(options);
  rp(options).then(function(result) {
    console.log('in result');
    return res.status(200).json(result);
  })
  .catch(function (err) {
    console.log(err);
    return res.status(407).json({err: "error gathering data"});
  });
});

router.post('/remove', util.checkLogin, function(req, res, next) {
  Users.removeFavorite(req.user.id, req.body.jobID);
});

router.post('/add', util.checkLogin, function(req, res, next) {
  Users.favoriteJob(req.user.id, req.body.jobID);
});

module.exports = router;
