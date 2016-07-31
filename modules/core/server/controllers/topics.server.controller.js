/* eslint-disable */
'use strict';

/**
 * Module dependencies.
 */
  var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Topic = mongoose.model('Topic'),
  _ = require('lodash');

/**
 * Create a Topic
 */
exports.create = function (req, res) {
var topic = new Topic(req.body);

	topic.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(topic);
		}
	});
};

/**
 * Show the current Topic
 */
exports.read = function(req, res) {
	res.json(req.topic);
};

/**
 * Update a Topic
 */
exports.update = function (req, res) {
var topic = req.topic;

	topic = _.extend(topic, req.body);

	topic.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(topic);
		}
	});
};

/**
 * Delete an Topic
 */
exports.delete = function (req, res) {
var topic = req.topic;

	topic.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(topic);
		}
	});
};

/**
 * List of Topics
 */
exports.list = function(req, res) {
	console.log("Fetching Topics");
	Topic.find().sort('name').exec(function(err, topics) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(topics);
		}
	});
};

/**
 * topic middleware
 */
exports.topicByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Topic is invalid'
		});
	}

	Topic.findById(id).exec(function(err, topic) {
		if (err) return next(err);
		if (!topic) {
			return res.status(404).send({
  				message: 'Topic not found'
  			});
		}
		req.topic = topic;
		next();
	});
};