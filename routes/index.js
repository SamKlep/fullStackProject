//Declare all variables////////////////////////////
///////////////////////////////////////////////////

const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Wine = require('../models').Wine;
const User = require('../models').User;


//Create router for signup or register new user/////
///////////////////////////////////////////////////

router.post('/signup', function(req, res) {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
      res.status(400).send({msg: 'Please pass username and password.'})
    } else {
      User
        .create({
          username: req.body.username,
          password: req.body.password
        })
        .then((user) => res.status(201).send(user))
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    }
  });

///Create router for sigin or log in with username and password///////////////////////////////////////////

  router.get('/wine', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      Wine
        .findAll()
        .then((wines) => res.status(200).send(wines))
        .catch((error) => { res.status(400).send(error); });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

// Route for Google Authentication
router.get('/google',passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', (req, res) => {
  res.send('You reached the callback URL')
})

  
////Create secure router to get and post wine/beer/////
////data///////////////////////////////////////////////

  router.post('/wine', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      Wine
        .create({
          prod_name: req.body.prod_name,
          prod_type: req.body.prod_type,
          prod_date: req.body.prod_date,
          prod_desc: req.body.prod_desc,
          prod_rating: req.body.prod_rating
        })
        .then((wine) => res.status(201).send(wine))
        .catch((error) => res.status(400).send(error));
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  module.exports = router;  