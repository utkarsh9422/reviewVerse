var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  creation: { type: Date, default: Date.now },
  name: {type: String,required: true},
  description: {type: String,required: true},
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
});

mongoose.model('Category', CategorySchema);
