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
        email        : { type: String, require: true, unique: true },
        password     : { type: String, require:true },
		name         : { type: String }
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        tid           : String,
        t_token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        gid           : String,
        g_token        : String,
        google_email        : String,
        gname         : String
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

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name),
  }, cfg.sessionSecret,
  expiresInMinutes : 1440); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
