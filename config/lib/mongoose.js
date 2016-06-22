var config = require('../config.js'),
mongoose = require('mongoose'),
path = require('path');

module.exports.loadModels = function(callback){
  config.files.server.models.forEach((modelPath)=>{
    require(path.resolve(modelPath));
  });
  if(callback) callback();
};

module.exports.connect = function(callback){
  var database = mongoose.connect(config.db.uri, config.db.options,function(err){
    if(err){
      console.log('no se pudo conectar a la bd :( :v)');
      console.log(err);
    }
    if(callback) callback(database);
  });
}

module.exports.disconnect = function(callback){
  mongoose.disconnect(function(err){
    console.log('disconnected :D :V');
    if(callback) callback(err);
  });
}
