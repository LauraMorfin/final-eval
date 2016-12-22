var mongoose = require('mongoose');

//game Schema
var gameSchema = mongoose.Schema({
    name:{
      type: String,
      require: true
    },
    catagory :{
      type: String,
      require: true
    },
    description:{
      type: String
    },
    by :{
      type: String,
      require: true
    },
    rating:{
      type: String
    },
    price:{
      type: String
    },
    system:{
      type: String
    },
    image_url:{
      type: String
    },
    buy_url:{
      type: String
    },
    create_date:{
      type: Date,
      default: Date.now
    }
});
var Game = module.exports = mongoose.model('Game', gameSchema);

//Get games
module.exports.getGames = function(callback){
      Game.find(callback);

}

//get Game
module.exports.getGameById = function(id, callback){
  Game.findById(id, callback);
}

//add games
module.exports.addGame = function(game, callback){
    Game.create(game, callback);
  }

//Update Game
module.exports.updateGame = function(id, game, options, callback){
  var query = {_id :id};
  var update = {
    name: game.name,
    catagory: game.catagory,
    description: game.description,
    by: game.by,
    rating: game.rating,
    price: game.price,
    system: game.system,
    image_url: game.image_url,
    buy_url: game.buy_url
  }

  Game.findOneAndUpdate(query, update, options, callback);
}

//delete games
module.exports.removeGame = function(id, callback){
  var query = {_id: id};
  Game.remove(query, callback);
}
