var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  creation: { type: Date, default: Date.now },
  name: String,
  description: String,
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topics' }]
});

mongoose.model('Category', CategorySchema);
