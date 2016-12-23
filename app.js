if(process.env.NODE_ENV !== 'production') require('dotenv').config();

var express = require('express');
var app =express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

category = require('./models/category');
Game = require('./models/game');
// //connect to mongoose

var MLAB_URI = process.env.MLAB_URI;
console.log(MLAB_URI);
mongoose.connect(MLAB_URI);
//mongoose.connect('mongodb://localhost/final-eval');
var db = mongoose.connection;

app.get('/', function(req,res){
  res.send('Please use api/games or api/categories');

});

app.get('/api/categories', function(req,res){
  category.getcategories(function(err, categories){
    if(err){
      throw err;
    }
    res.json(categories)
  });

});
app.post('/api/categories', function(req,res){
  var category = req.body;
  category.addcategory(category, function(err, category){
    if(err){
      throw err;
    }
    res.json(category);
  });
});
app.put('/api/categories/:_id', function(req,res){
  var id = req.params._id;
  var category = req.body;
  category.updatecategory(id, category,{}, function(err, category){
    if(err){
      throw err;
    }
    res.json(category);
  });
});
app.delete('/api/categories/:_id', function(req, res){
  var id = req.params._id;
  category.removecategory(id, function(err, category){
    if(err){
      throw err;
    }
    res.json(category);
  });
});
app.get('/api/games', function(req,res){
  Game.getGames(function(err, games){
    if(err){
      throw err;
    }
    res.json(games);
  });
});

app.get('/api/games/:_id', function(req, res){
  Game.getGameById(req.params._id, function(err, game){
    if(err){
      throw err;
    }
    res.json(game);
  });
});

app.post('/api/games', function(req, res){
  var game = req.body;
  Game.addGame(game, function(err, game){
    if(err){
      throw err;
    }
    res.json(game);
  });
});

app.put('/api/games/:_id', function(req, res){
  var id = req.params._id;
  var game = req.body;
  Game.updateGame(id, game, {}, function(err, game){
    if(err){
      throw err;
    }
    res.json(game);
  });
});

app.delete('/api/games/:_id', function(req, res){
  var id = req.params._id;
  Game.removeGame(id, function(err, book){
    if(err){
      throw err;
    }
    res.json(game);
  });
});
// app.listen(5000);
// console.log('Running on port 5000...');
var myPORT = process.env.PORT || 5000;
app.listen(myPORT);
console.log('Running on port ' + myPORT);
