/* eslint-disable */
'use strict';
// auth.js
var mongoose = require('mongoose');
var passport = require("passport");
var path = require('path');
var passportJWT = require("passport-jwt");
var User = mongoose.model('User');
var cfg = require("../config/config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;  
var TwitterStrategy = require('passport-twitter').Strategy;  
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var jwt = require('jwt-simple');
var moment = require('moment');
var params = {
secretOrKey: cfg.sessionSecret,
jwtFromRequest: ExtractJwt.fromAuthHeader()
//jwtFromRequest: ExtractJwt.fromHeader("Authorization")
};


/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, cfg.sessionSecret);
	console.log("Payload:"+payload+ "    "+payload.sub);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
};
/*authenticate: function() {
return passport.authenticate("jwt", cfg.sessionSecret);
}*/


