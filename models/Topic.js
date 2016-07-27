var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
  creation: { type: Date, default: Date.now },
  name: [InternationalStringSchema],
  description: [InternationalStringSchema],
  upvotes: {type: Number, default: 0},
  avgRating:{type: Number, default: 0},
  parentCategoryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

mongoose.model('Topic', TopicSchema);