/* eslint-disable */
'use strict';
// auth.js
var mongoose = require('mongoose');
var path = require('path');
var User = mongoose.model('User');
var cfg = require("../config/config.js");
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var params = {
secretOrKey: cfg.sessionSecret,
jwtFromRequest: ExtractJwt.fromAuthHeader()
//jwtFromRequest: ExtractJwt.fromHeader("Authorization")
};


aws.config.update({accessKeyId: 'AKIAJN7IZ6XOLP6VT7FQ', secretAccessKey: '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', signatureVersion: 'v4'});
var s3 = new aws.S3({ /* ... */ })
exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'topicimage',
	acl: 'public-read',
	contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
		
      cb(null, Date.now().toString());  
    }
  })
});
/*authenticate: function() {
return passport.authenticate("jwt", cfg.sessionSecret);
}*/


