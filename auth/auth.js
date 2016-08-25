/* eslint-disable */
'use strict';
// auth.js
var mongoose = require('mongoose');
var passport = require("passport");
var path = require('path');
var passportJWT = require("passport-jwt");
var users = mongoose.model('User');
var cfg = require("../config/config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
secretOrKey: cfg.sessionSecret,
jwtFromRequest: ExtractJwt.fromAuthHeader()
//jwtFromRequest: ExtractJwt.fromHeader("Authorization")
};

module.exports = function() {
	
var strategy = new Strategy(params, function(payload, done) {
	console.log(payload.id);
User.findOne({_id:payload.id}, function(err, user) {
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