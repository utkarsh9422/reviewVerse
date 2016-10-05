/* eslint-disable */
// jshint ignore: start
'use strict';

/**
 * Module dependencies.
 */
  var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Topic = mongoose.model('Topic'),
  Review = mongoose.model('Review'),
  _ = require('lodash');
  var util = require('util')

 /**
 * Create a Topic
 */
exports.create = function (req, res) {
	var imageUrl='';
	if(req.files){
		for(var i = 0, len = req.files.length; i < len; i++){
			console.log(req.files[i].location);
			imageUrl=req.files[i].location;
			}
	}		
	var topic = new Topic(req.body);
	topic.imageArray = imageUrl;

	topic.save(function(err) {
		if (err) {
			console.log(util.inspect(req, {showHidden: false, depth: null}));
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
	var user = req.user;

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
 * Upvote a Topic
 */
exports.upvote = function (req, res) {
		var topicId = req.topic;
		var userId = req.user;
		Topic.findOneAndUpdate({"_id": topicId,"voters_up._id":{ $ne: userId }},
		//Topic.findOneAndUpdate({"_id": topicId},
		{$push: { "voters_up": userId },$set: { "upvotes": upvotes+1 } },
		{ new: true }, function(err, topic){
			if(err){
				console.log("Something wrong when updating data!");
				return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			}
				console.log(topic);
				res.json(topic);
});
	/*topic.upvotes+=1;

	topic.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(topic);
		}
	});*/
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
	var categoryId=req.query.categoryId;
	if(categoryId == null){
		Topic.find().sort('name').exec(function(err, topics) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(topics);
		}
	});
	}
	else{
		console.log("Fetching Topics by categoryId="+categoryId);
	Topic.find({category: categoryId}).exec(function(err, topics) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(topics);
		}
	});
	}
};

/**
 * List of Reviews for a topic
 */
exports.getReviews = function(req, res) {
	console.log("Fetching Topic Reviews");
	var topicId = req.topic;

	console.log("Fetching Reviews by TopicId="+topicId);
	Review.find({ownerTopicId: topicId}).exec(function(err, reviews) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(reviews);
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
