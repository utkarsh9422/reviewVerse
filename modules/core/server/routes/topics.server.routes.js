/* eslint-disable */
'use strict';

module.exports = function(app) {
  // Routing logic   
  // ...
  var topics = require('../controllers/topics.server.controller');

	app.route('/topics')
	  .post(topics.create);  
	  
	app.route('/topics/:topicId')
	.put(topics.update)
	.delete(topics.delete);
	
	app.route('/topics/:topicId/upvote')
	.put(topics.upvote);
	
	// Finish by binding the article middleware
	// What's this? Where the topicId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.topic.
	app.param('topicId', topics.topicByID);
};