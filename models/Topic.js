var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
  creation: { type: Date, default: Date.now },
  name: {type: String,required: true},
  description: String,
  upvotes: {type: Number, default: 0},
  avgRating:{type: Number, default: 0},
  parentCategoryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Category',required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

mongoose.model('Topic', TopicSchema);
