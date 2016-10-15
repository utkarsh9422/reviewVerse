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
			//console.log(util.inspect(req, {showHidden: false, depth: null}));
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
		var conditions = {"_id": topicId,"voters_up":{ $ne: userId }};
		var update = {$push: { "voters_up": userId }, $inc: { "upvotes": 1 } };
		var options = { new: true };
		Topic.findOneAndUpdate(conditions,update,options, function(err, topic){
			if(err){
				console.log("Something wrong when updating data!");
				return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			}
			if(topic){
				console.log(topic);
				res.json(topic);
			}
			else {
				console.log("Topic already upvoted by this user:"+userId);
				return res.status(409).send({
				message: "Topic already upvoted by this user:"+userId
			});
			}
			
				
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
	var lquery  = {};
	var loptions = {};
	readQueryParams(req,function(query,options){
		lquery = query;
		loptions = options;
	})
	Topic.paginate(lquery, loptions,function(err,result) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: err.message
			});
		} else {
			res.json(result.docs);
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

function readQueryParams(req, callback) {
	console.log("Reading Query Parameters and converting to query and options field");
	var page = 1;
	var pageSize = 20;
	var reviewCount = 5;
	var reviewUpvotes;
	var reviewRatings;
	var query = {};
	var sortParams = '';
	var populateParams = [];
	if(req.query.categoryId){query.category = req.query.categoryId;}
	if(req.query.avgRating){query.avgRating = req.query.avgRating;}
	if(req.query.upvotes){query.upvotes = req.query.upvotes;}
    if(req.query.page){page = req.query.page;}
    if(req.query.pageSize){pageSize =req.query.pageSize;}
	if(req.query.sortBy){sortParams = req.query.sortBy;	}
	if(req.query.reviewCount){reviewCount = req.query.reviewCount;}	
	if(req.query.reviewUpvotes){reviewUpvotes = req.query.reviewUpvotes;}
	if(req.query.reviewRatings){reviewRatings = req.query.reviewRatings;}	
	if((req.get('x-fetchreviews')) === 'true'){
			var populationFields ={};
			var lmatchFields = {};			
			populationFields.path = 'reviews';
			populationFields.select = 'reviewerName rating upvotes body -_id';
			populationFields.options = { limit: reviewCount };
			//Setting Match Fields
			getMatchFields(reviewRatings,reviewUpvotes,function(matchFields){
				lmatchFields=matchFields;
			});
			populationFields.match=lmatchFields;	
			populateParams.push(populationFields);
			}
	var options = {
				//select: 'title date author',
				sort: sortParams,
				populate: populateParams,
				//lean: true,
				page: Number(page), 
				limit: Number(pageSize)
				};
	callback(query,options);
}

function getMatchFields(reviewRatings,reviewUpvotes,callback){
	var matchFields = {};
	console.log("ReviewUpvotes:"+reviewUpvotes );
	console.log("ReviewRatings:"+reviewRatings );
	if(reviewUpvotes){matchFields.upvotes = {$eq : Number(reviewUpvotes)};}
	if(reviewRatings){matchFields.rating = {$eq : Number(reviewRatings)};}
	return callback(matchFields);
}