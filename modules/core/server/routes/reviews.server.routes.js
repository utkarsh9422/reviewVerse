/* eslint-disable */
'use strict';
var cors = require('cors');

module.exports = function(app) {
  // Routing logic   
  // ...
  app.use(cors());
  var reviews = require('../controllers/reviews.server.controller');
    
	app.route('/reviews/:reviewId')
	.put(reviews.update)
	.delete(reviews.delete);
	
	app.route('/reviews/:reviewId/upvote')
	.put(reviews.upvote);
	
	app.param('reviewId', reviews.reviewByID);
	
};
