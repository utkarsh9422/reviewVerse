// jscs:disable
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate'),
  Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength(v) {
    // a custom validation function for checking string length to be used by the model
  return v.length <= 15;
}

/**
 * Category Schema
 */
var TokenSchema = new Schema({
    // the property name
  created: {
        // types are defined e.g. String, Date, Number (http://mongoosejs.com/docs/guide.html)
    type: Date,
        // default values can be set
    default: Date.now
  },
  registrationToken: {
    type: String,
    default: ''
  }
});
TokenSchema.plugin(mongoosePaginate);
// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('Token', TokenSchema);