/* eslint-disable */
'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var jwt    = require('jsonwebtoken');
var cors = require('cors');
module.exports = function (app) {
	app.use(cors());
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  //app.route('/profile').get(users.readUserProfile);
  app.route('/login').post(users.login);
  app.route('/signup').post(users.createUser);

  app.route('/users').get(users.list);
  
  //Facebook Login
  app.route('/auth/facebook')
  .get(passport.authenticate('facebook', { scope: 'email' }));
  // Callback
  app.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook'),function(req, res) {
 // Create JWT Token 
	            var token;
	             token = req.user.generateJwt();
                 res.status(200);
                 res.json({
                    "token" : token
                  });
});

  
 app.route('/users/:userId')
 .delete(users.delete);
  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
