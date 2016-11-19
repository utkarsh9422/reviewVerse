/* eslint-disable */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate'),
  QueryPlugin = require('mongoose-query'),
  Schema = mongoose.Schema;

    /**
 * Validation
 */
function validateLength (v) {
  // a custom validation function for checking string length to be used by the model
  return v.length <= 1000;
}

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
  // Review model fields
  // ...
  ownerTopicId: { 
		type: Schema.Types.ObjectId,
		ref: 'Topic',
		required: 'Invalid Topic'
	},
	created: {
		type: Date,
		default: Date.now
	},
	body: {
		type: String,
		default: '',
		trim: true, 	
		required: 'review body cannot be blank',
		validate: [validateLength, 'review must be 1000 chars in length or less']
	},
	reviewerId: { 
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	reviewerName: { 
		type: String,
		trim: true
	},
	upvotes: {
		type: Number,
		default: 0,
		readOnly:true
	},
	rating: {
		type: Number,
		default: 0,
		required: 'rating cannot be null'
	},
	voters_up: [{ 
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});
//ReviewSchema.plugin(mongoosePaginate);
ReviewSchema.plugin(QueryPlugin);
mongoose.model('Review', ReviewSchema);
