var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Review = mongoose.model('Review');
var Topic = mongoose.model('Topic');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', function(req, res, next) {
  Category.find(function(err, categories){
    if(err){ return next(err); }

    res.json(categories);
  });
});

router.post('/categories', function(req, res, next) {
  var category = new Category(req.body);

  category.save(function(err, category){
    if(err){ return next(err); }

    res.json(category);
  });
});
module.exports = router;
