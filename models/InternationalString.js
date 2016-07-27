var mongoose = require('mongoose');

var InternationalStringSchema = new mongoose.Schema({
 lang: String,
  text: String
});

mongoose.model('InternationalStringSchema', InternationalStringSchema);