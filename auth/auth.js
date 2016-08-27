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
var params = {
secretOrKey: cfg.sessionSecret,
jwtFromRequest: ExtractJwt.fromAuthHeader()
//jwtFromRequest: ExtractJwt.fromHeader("Authorization")
};

module.exports = function() {
	
var strategy = new Strategy(params, function(payload, done) {
	console.log(payload._id);
User.findById(payload._id).exec(function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
});

var facebookStrategy = new FacebookStrategy({  
    clientID: cfg.facebook.clientID,
    clientSecret: cfg.facebook.clientSecret,
    callbackURL: cfg.facebook.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name']
  },
  function(token, refreshToken, profile, done) {
	  console.log("Token: "+ token);
	  console.log("RefreshToken: "+ refreshToken);
	  console.log("profile: "+ profile);
    process.nextTick(function() {
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
			console.log("User Found");
			var token;
	             token = user.generateJwt();
                 res.status(200);
                 res.json({
                    "token" : token
                  });
          //return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  });
passport.use(facebookStrategy);  
passport.use(strategy);
return {
initialize: function() {
return passport.initialize();
},
authenticate: function() {
return passport.authenticate("jwt", cfg.sessionSecret);
}
};
};