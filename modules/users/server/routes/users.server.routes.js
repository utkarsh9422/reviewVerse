/* eslint-disable */
'use strict';
var express = require("express");
var path = require('path');
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
  .post(users.loginWithFacebook);
  
  //Google Login
  app.route('/auth/google')
  .post(users.loginWithGoogle);
 
 
 app.route('/users/:userId')
 .delete(users.delete);
  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
