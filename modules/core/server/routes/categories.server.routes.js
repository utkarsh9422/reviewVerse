/* eslint-disable */
'use strict';
var cors = require('cors');
var path = require('path');
var auth= require(path.resolve('./auth/auth.js'))();
module.exports = function(app) {
  // Routing logic   
  // ...
  app.use(cors());
  app.use(auth.initialize());
  var categories = require('../controllers/categories.server.controller');
var topics = require('../controllers/topics.server.controller');
 var reviews = require('../controllers/reviews.server.controller');
 
 /*app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
   // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
 });*/
 
	app.route('/categories')
	  .get(auth.authenticate(),categories.list)
	  .post(categories.create);
	  
	app.route('/categories/:categoryId')
   	.get(categories.read)
	.put(categories.update)
	.delete(categories.delete);
	
	
	//ToDo Code to be moved to Topics Route
	app.route('/topics')
	.get(auth.authenticate(),topics.list);
	
	app.route('/topics/:topicId')
   	.get(auth.authenticate(),topics.read);
	
	app.route('/topics/:topicId/reviews')
   	.get(topics.getReviews);
	
	 app.route('/reviews')
	.get(reviews.list);
	
	app.route('/reviews/:reviewId')
   	.get(reviews.read);
	
	// Finish by binding the article middleware
	// What's this? Where the categoryId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.category.
	app.param('categoryId', categories.categoryByID);
	app.param('topicId', topics.topicByID);
	app.param('reviewId', reviews.reviewByID);
};

