var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Review = mongoose.model('Review');
var Topic = mongoose.model('Topic');
app.use(bodyParser());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/categories', function(req, res, next) {
  Category.find(function(err, categories){
    if(err){ return next(err); }

    res.json(categories);
  });
});

app.post('/categories', function(request, response,next) {
	console.log(request.body);
  var category = new Category(request.body);

  category.save(function(err, category){
    if(err){ return next(err); }

    response.json(category);
  });
});

app.post('/topics', function(request, response,next) {
	console.log(request.body);
  var topic = new Topic(request.body);

  topic.save(function(err, topic){
    if(err){ return next(err); }

    response.json(topic);
  });
});

app.get('/topics', function(req, res, next) {
  Topic.find(function(err, topics){
    if(err){ return next(err); }

    res.json(topics);
  });
});
module.exports = router;
app.listen(3001);
