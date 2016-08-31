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
                return res.status(400).send({
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
                newUser.save(function(err) {
                    if (err){
						return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
					}
               else{
				   res.status(201).json(newUser);
			   }
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
 * Generate JWT Token 
 */
exports.facebookCallback = function(req, res) {
	var token;
	             token = req.user.generateJwt();
    var returnString = '' +
          '<!DOCTYPE html>\n' +
          '<html>\n' +
            '<head>\n' +
              '<meta charset="UTF-8">\n' +
              '<title>Login</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '<script type="text/javascript">\n' +
              'window.localStorage[\'mean-token\']  = \''+token+'\';\n' +
              'window.opener.location.reload(false);\n' +
              'window.close();\n' +
            '</script>\n' +
            '</body>\n' +
          '</html>'; 

  res.send(returnString);				  
}; 

/**
 * Generate JWT Token 
 */
exports.generateJWT = function(req, res) {
	var token;
	             token = req.user.generateJwt();
                 res.status(200);
                 res.json({
                    "token" : token
                  });
}; 
  /**
 * Require login routing middleware
 */


