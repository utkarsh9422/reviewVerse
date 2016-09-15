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
  
  var reviews = require('../controllers/reviews.server.controller');
    
	app.route('/reviews/:reviewId')
	.put(auth.ensureAuthenticated,reviews.update)
	.delete(auth.ensureAuthenticated,reviews.delete);
	
	app.route('/reviews/:reviewId/upvote')
	.put(auth.ensureAuthenticated,reviews.upvote);
	
	app.param('reviewId', reviews.reviewByID);
	
};
