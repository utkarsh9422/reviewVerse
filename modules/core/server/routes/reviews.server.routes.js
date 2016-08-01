/* eslint-disable */
'use strict';

module.exports = function(app) {
  // Routing logic   
  // ...
  var reviews = require('../controllers/reviews.server.controller');
    
	app.route('/reviews/:reviewId')
	.put(reviews.update)
	.delete(reviews.delete);
	
	app.route('/reviews/:reviewId/upvote')
	.put(reviews.upvote);
	
	app.param('reviewId', reviews.reviewByID);
	
};
