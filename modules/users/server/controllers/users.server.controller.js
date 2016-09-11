/* eslint-disable */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	jwt    = require('jsonwebtoken'),
	cfg = require("../../../../config/config.js"),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),	
    _ = require('lodash');
	
var request = require('request');
	

/**
 * Extend user's controller
 */
/*module.exports = _.extend(
  require('./users/users.authentication.server.controller'),
  require('./users/users.authorization.server.controller'),
  require('./users/users.password.server.controller'),
  require('./users/users.profile.server.controller')*/
  
  /**
 * Create a User
 */
exports.createUser = function(req, res) {
	var email = req.body.email,
        password = req.body.password,
		name=req.body.name;
	console.log("email: "+email+"password: "+password);
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err){
				console.log("error1");
				return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			}
            // check to see if theres already a user with that email
            if (user) {
                return res.status(409).send({
					message: 'User already exists'
				});
            } else {

				// if there is no user with that email
                // create the user
                var newUser            = new User();
                // set the user's local credentials
				newUser.local.name= name;
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
				console.log(newUser);
				// save the user
                newUser.save(function(err,result) {
                     if (err) {
						res.status(500).send({ message: err.message });
					}
                res.json({
                    "token" : result.generateJwt()
                  });
                });
            }

        });
};

 /**
 * Login a User
 */
exports.login = function(req, res) {
	var email = req.body.email,
        password = req.body.password;
		console.log(req.get('Content-Type'));
		console.log("Email: "+email);
			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
				return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			}
            // if no user is found, return the message
            if (!user){
                return res.status(400).send({
			message: 'User Not found'
		}); // req.flash is the way to set flashdata using connect-flash
			}
            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
				return res.status(400).send({
			message: 'Oops! Wrong password.'
		});
			}
			else{
				 var token;
	             token = user.generateJwt();
                 res.status(200);
                 res.json({
                    "token" : token
                  });
			}
            
        });
};
  
/**
 * List of Users
 */
exports.list = function(req, res) {
	User.find().sort('name').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};


/**
 * Delete an User
 */
exports.delete = function(req, res) {
	var user = req.user;

	user.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};
 
/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'User is invalid'
		});
	}

	User.findById(id).exec(function(err, user) {
		if (err) return next(err);
		if (!user) {
			return res.status(404).send({
  				message: 'User not found'
  			});
		}
		req.user = user;
		next();
	});
}; 

/**
 * Login Through Facebook
 */
exports.loginWithFacebook = function(req, res) {
	var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
	var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
	var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: cfg.facebook.clientSecret,
		redirect_uri: req.body.redirectUri
		};
	// Step 1. Exchange authorization code for access token.
	request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message });
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
      }
      if (req.header('Authorization')) {
        User.findOne({ 'facebook.id': profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, cfg.sessionSecret);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.facebook.id = profile.id;
            user.facebook.picture = user.facebook.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
			user.facebook.email = profile.email;
            user.facebook.name = profile.name;
            user.save(function() {
              var token = user.generateJwt();
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3. Create a new user account or return an existing one.
        User.findOne({ 'facebook.id': profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = existingUser.generateJwt();
            return res.send({ token: token });
          }
          var user = new User();
          user.facebook.id = profile.id;
          user.facebook.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.facebook.name = profile.name;
		  user.facebook.email = profile.email;
          user.save(function() {
            var token = user.generateJwt();
            res.send({ token: token });
          });
        });
      }
    });
  });
	
};

/**
 * Login Through Google
 */
exports.loginWithGoogle = function(req, res) {
	var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: cfg.google.clientSecret,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({message: profile.error.message});
      }
      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        User.findOne({ 'google.id': profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, cfg.sessionSecret);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.google.id = profile.sub;
            user.google.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
            user.google.name = user.displayName || profile.name;
            user.save(function() {
              var token = user.generateJwt();
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ 'google.id': profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.send({ token: existingUser.generateJwt() });
          }
          var user = new User();
          user.google.id = profile.sub;
          user.google.picture = profile.picture.replace('sz=50', 'sz=200');
          user.google.name = profile.name;
          user.save(function(err) {
            var token = user.generateJwt();
            res.send({ token: token });
          });
        });
      }
    });
  });

};

