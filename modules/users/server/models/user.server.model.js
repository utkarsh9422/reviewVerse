/* eslint-disable */
'use strict';
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var path = require('path');
var bcrypt   = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken');
var cfg = require(path.resolve('./config/config.js'));

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : { type: String },
        password     : { type: String },
		name         : { type: String }
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
		picture      : String
    },
    twitter          : {
        id           : String,
        picture      : String,
        name  		 : String,
        username     : String
    },
    google           : {
        id           : String,
        picture      : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Create JWT 
userSchema.methods.generateJwt = function(){
var data = {
    _id: this._id,
	local:{
		email: this.local.email,
		name: this.local.name},
	facebook:{
		email: this.facebook.email,
		name: this.facebook.name},
	twitter:{
		displayName: this.twitter.displayName,
		username: this.twitter.username},
	google:{
		email: this.google.email,
		name: this.google.name}
};
    return jwt.sign(data,cfg.sessionSecret,{
    expiresInMinutes : 1440
  }); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
