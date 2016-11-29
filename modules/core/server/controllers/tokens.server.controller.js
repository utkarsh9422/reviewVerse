/* eslint-disable */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Token = mongoose.model('Token'),
    _ = require('lodash');

/**
 * Create a Token
 */
exports.create = function(req, res) {
	var token = new Token(req.body);

	token.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(token);
		}
	});
};

/**
 * Show the current Token
 */
exports.read = function(req, res) {
	res.json(req.token);
};

/**
 * Update a Token
 */
exports.update = function(req, res) {
	var token = req.token;

	token = _.extend(token, req.body);

	token.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(token);
		}
	});
};

/**
 * Delete an Token
 */
exports.delete = function(req, res) {
	var token = req.token;

	token.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(token);
		}
	});
};

/**
 * List of Categories
 */
exports.list = function(req, res) {
	Token.find().exec(function(err, tokens) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(tokens);
		}
	});
};

/**
 * Token middleware
 */
exports.tokenByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Token is invalid'
		});
	}

	Token.findById(id).exec(function(err, token) {
		if (err) return next(err);
		if (!token) {
			return res.status(404).send({
  				message: 'Token not found'
  			});
		}
		req.token = token;
		next();
	});
};
