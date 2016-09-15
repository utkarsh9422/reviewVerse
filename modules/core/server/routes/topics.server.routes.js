/* eslint-disable */
'use strict';
var cors = require('cors');
var path = require('path');
var auth= require(path.resolve('./auth/auth.js'));
module.exports = function(app) {
  // Routing logic   
  // ...
  app.options('*', cors());
  app.use(cors());
  
  var topics = require('../controllers/topics.server.controller');
var reviews = require('../controllers/reviews.server.controller');
	app.route('/topics')
	  .post(auth.ensureAuthenticated,topics.create);  
	  
	app.route('/topics/:topicId')
	.put(auth.ensureAuthenticated,topics.update)
	.delete(auth.ensureAuthenticated,topics.delete);
	
	app.route('/topics/:topicId/upvote')
	.put(auth.ensureAuthenticated,topics.upvote);
	
	app.route('/topics/:topicId/reviews')
	.post(auth.ensureAuthenticated,reviews.create);
	// Finish by binding the article middleware
	// What's this? Where the topicId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.topic.
	app.param('topicId', topics.topicByID);
};
