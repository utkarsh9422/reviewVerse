/* eslint-disable */
'use strict';
var cors = require('cors');
var path = require('path');
var auth= require(path.resolve('./auth/auth.js'));
module.exports = function(app) {
  // Routing logic   
  // ...
  app.use(cors());
  //app.use(auth.initialize());
  var tokens = require('../controllers/tokens.server.controller');
 
 /*app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
   // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
 });*/
 
	app.route('/tokens')
	  .post(tokens.create);
	  
	app.route('/tokens/:tokenId')
	.put(tokens.update)
	.delete(tokens.delete);
	
	// Finish by binding the article middleware
	// What's this? Where the categoryId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.category.
	app.param('tokenId', tokens.tokenByID);

};

