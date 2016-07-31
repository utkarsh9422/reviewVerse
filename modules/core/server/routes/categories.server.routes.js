/* eslint-disable */
'use strict';

module.exports = function(app) {
  // Routing logic   
  // ...
  var categories = require('../controllers/categories.server.controller');
var topics = require('../controllers/topics.server.controller');
	app.route('/categories')
	  .get(categories.list)
	  .post(categories.create);
	  
	app.route('/categories/:categoryId')
   	.get(categories.read)
	.put(categories.update)
	.delete(categories.delete);
	
	
	//ToDo Code to be moved to Topics Route
	app.route('/topics')
	.get(topics.list);
	
	app.route('/topics/:topicId')
   	.get(topics.read);
	
	// Finish by binding the article middleware
	// What's this? Where the categoryId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.category.
	app.param('categoryId', categories.categoryByID);
	app.param('topicId', topics.topicByID);
};

