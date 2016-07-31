/* eslint-disable */
'use strict';

module.exports = function(app) {
  // Routing logic   
  // ...
 app.route('/topics')
		.get(function (request, response) {
			response.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
		});
};