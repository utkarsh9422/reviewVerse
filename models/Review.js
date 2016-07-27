var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  creation: { type: Date, default: Date.now },
  author:String,
  body: [InternationalStringSchema],
  rating: {type: Number, default: 0},
  ownerTopicId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }
});

mongoose.model('Review', ReviewSchema);