'use strict'

var config = require('../config'),
mongoose = require('./mongoose'),
express = require('./express');

module.exports.loadModels = function(){
  mongoose.loadModels();
};

module.exports.init = function(callback){
  mongoose.connect(function(db){
    var app = express.init(db);
    if(callback) callback(app,db,config);
  });
};

module.exports.start = function(callback){
  var _this = this;
  _this.init(function(app, db, config){
    app.listen(config.port, config.host, function(){
      var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      console.log('Running app :v ');
      if(callback) callback(app, db, config);
    });
  });
}
