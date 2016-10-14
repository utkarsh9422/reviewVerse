/* eslint-disable */
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
function validateLength (v) {
  // a custom validation function for checking string length to be used by the model
  return v.length <= 40;
}

/**
 * Topic Schema
 */
var TopicSchema = new Schema({
  // Topic model fields
  // ...
  category: { 
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: 'invalid category'
	},
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true, 	
		required: 'name cannot be blank',
		validate: [validateLength, 'name must be 40 chars in length or less']
	},
	 description: {
    type: String,
    default: '',
        // types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
    trim: true
  },
	upvotes: {
		type: Number,
		default: 0
	},
	avgRating: {
		type: Number,
		default: 0,
		min: 0
	},
	imageArray:{
		type: String,
		default: '',
		trim: true
	},
	voters_up: [{ 
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
	
});
TopicSchema.plugin(mongoosePaginate);
mongoose.model('Topic', TopicSchema);
