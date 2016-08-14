/* eslint-disable */
'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  Review = mongoose.model('Review'),
  Topic = mongoose.model('Topic'),
  _ = require('lodash');
  
  var topics = require('../controllers/topics.server.controller');

/**
 * Create a Review
 */
exports.create = function (req, res) {
var averageRating = 0;
var totalRating = 0;
var ratingCount = 0;
var review = new Review(req.body);
	averageRating=req.topic.avgRating;
	console.log("Current Avg Rating of TopicId="+req.topic._id+" is "+averageRating);
	console.log("Fetching Reviews Count by TopicId= "+req.topic._id);
	Review.count({ownerTopicId: req.topic._id}, function(err, count){
		if (err) {
			console.log("error",err);
			}
		else{	
			ratingCount = count;
			console.log( "Number of Count: ", ratingCount );
			totalRating = averageRating * ratingCount;	
			console.log("Total Rating:"+totalRating);
			review.save(function(err) {
				if (err) {
					return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
					console.log(err);
				});
			  } else {
					totalRating+=req.body.rating;
					console.log( "Updated TotalRating: ", totalRating );
					ratingCount+=1;
					console.log( "Updated Count: ", ratingCount );
					averageRating=totalRating/ratingCount;
					console.log( "Updated avgRating: ", averageRating );
					Topic.findByIdAndUpdate(req.topic.id, { $set: { avgRating: averageRating }}, function (err, topic) {
						if (err) {
							return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
						}			 
		});
			res.status(201).json(review);
		}
	});
		}		
		});	
	
};

/**
 * Show the current Review
 */
exports.read = function (req, res) {
	res.json(req.review);
};

/**
 * Update a Review
 */
exports.update = function (req, res) {
var review = req.review;

	review = _.extend(review, req.body);

	review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(review);
		}
	});
};

/**
 * Upvote a Review
 */
exports.upvote = function (req, res) {
var review = req.review;

	review.upvotes+=1;

	review.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(review);
		}
	});
};

/**
 * Delete an Review
 */
exports.delete = function (req, res) {
var review = req.review;

	review.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(review);
		}
	});
};

/**
 * List of Reviews
 */
exports.list = function (req, res) {
Review.find().exec(function(err, reviews) {
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
 * Review middleware
 */
exports.reviewByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Review is invalid'
		});
	}

	Review.findById(id).exec(function(err, review) {
		if (err) return next(err);
		if (!review) {
			return res.status(404).send({
  				message: 'Review not found'
  			});
		}
		req.review = review;
		next();
	});	
};

