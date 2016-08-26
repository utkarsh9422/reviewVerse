/* eslint-disable */
'use strict';
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : { type: String, require: true, unique: true },
        password     : { type: String, require:true },
		name         : { type: String }
    }
	,
    facebook         : {
        fid           : String,
        f_token        : String,
        facebook_email        : String,
        fname         : String
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

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
