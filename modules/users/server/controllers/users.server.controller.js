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
	
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err){
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
				
				var data = {
					_id: user._id,
					name: user.local.name,
					email: user.local.email
				};
				console.log(data);
				// all is well, return successful user
				var token = jwt.sign(data, cfg.sessionSecret, {
				expiresInMinutes: 5 // expires in 24 hours
        });
				res.json({token: token});
			}
            
        });
};
  
 
  /**
 * Require login routing middleware
 */


