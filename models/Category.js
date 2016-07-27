var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  creation: { type: Date, default: Date.now },
  name: [InternationalStringSchema],
  description: [InternationalStringSchema],
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topics' }]
});

mongoose.model('Category', CategorySchema);