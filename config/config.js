'use strict'
var glob = require('glob'),
lodash = require('lodash'),
fs = require('fs'),
path = require('path');

// funcion que obtiene todas las rutas reales de los globPatterns (/**/*.js)
var getGlobbedPaths = function(globPattern, excludes){
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
  var output = [];
  var  files;
  if(lodash.isArray(globPattern)){
    globPattern.forEach(function(singlePath){
      output = lodash.union(output, getGlobbedPaths(singlePath, excludes));
    });
  }else if(lodash.isString(globPattern)){
    if(urlRegex.test(globPattern)){
      output.push(globPattern)
    }else {
      files = glob.sync(globPattern);
      if(excludes){
        files = files.map(function(file){
          if(lodash.isArray(excludes)){
            for(let i in excludes){
              if(excludes.hasOwnProperty(i)){
                file = file.replace(excludes[i],'')
              }
            }
          }else{
            file = file.replace(excludes,'');
          }
          return file;
        });
      }
      output = lodash.union(output,files);
    }

  }
  return output;
};

var initConfigFolder = function(config, assets){
  config.folders = {
    server:{},
    client:{},
  };
  config.folders.client = getGlobbedPaths(path.join(process.cwd(),'modules/*/client/'), process.cwd().replace(new RegExp(/\\/g),'/'));
};

var initGlobalConfigFiles = function(config, assets){
  config.files = {
    server:{},
    client:{}
  };
  //server config files
  config.files.server.models = getGlobbedPaths(assets.server.models);
  config.files.server.routes = getGlobbedPaths(assets.server.routes);
  config.files.server.configs = getGlobbedPaths(assets.server.config);
  config.files.server.policies = getGlobbedPaths(assets.server.policies);
  //client config files
  config.files.client.js = getGlobbedPaths(assets.client.lib.js,'public/').concat(getGlobbedPaths(assets.client.js,['public/']));
  config.files.client.css = getGlobbedPaths(assets.client.lib.css,'public/').concat(getGlobbedPaths(assets.client.css,['public/']));
}

var initGlobalConfiguration = function(){
  var assets = require(path.join(process.cwd(),'config/assets/default'));
  var config = require(path.join(process.cwd(),'config/env/development'));
  initConfigFolder(config, assets);
  initGlobalConfigFiles(config, assets);
  config.utils = {
    getGlobbedPaths: getGlobbedPaths,
  };
  return config;
}

module.exports = initGlobalConfiguration();
