/* eslint-disable */
'use strict';
var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var passport = require('passport');
var jwt    = require('jsonwebtoken');
var cors = require('cors');
var validate = require('express-validation');
var validation= require(path.resolve('./validators/contentHeader.js'));
module.exports = function (app) {
	app.use(cors());
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  //app.route('/profile').get(users.readUserProfile);
  app.route('/login').post(validate(validation.headers),users.login);
  app.route('/signup').post(users.createUser);

  app.route('/users').get(users.list);
  
  //Facebook Login
  app.route('/auth/facebook')
  .get(passport.authenticate('facebook', { scope: 'email' }));
  // Callback
  app.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook'),users.generateJWT);

  
 app.route('/users/:userId')
 .delete(users.delete);
  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
