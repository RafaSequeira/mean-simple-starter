'use strict'
var config = require('../config'),
express = require('express'),
bodyParser = require('body-parser'),
consolidate = require('consolidate'),
swig = require('swig'),
path = require('path');

// Inicializacion de variables locales
module.exports.initLocalVariables = function(app){
  app.locals.jsFiles = config.files.client.js;
  app.locals.cssFiles = config.files.client.css;
  app.locals.livereload = true;

  app.use(function(req, res, next){
    res.locals.host = req.protocol + '://'+ req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });
};
/// Inicializacion de middleware o app principal
module.exports.initMiddleware = function(app){
  app.set('showStackError',true);
  app.enable('jsonp callback');
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
};

module.exports.initViewEngine = function(app){
  //settea swig como template engine por defecto
  app.engine('server.view.html', consolidate[config.templateEngine]);
  app.set('view engine', 'server.view.html');
  app.set('views','./');
};

// configuracion de session o token debe ir aqui
module.exports.initSession = function(app, db){

};

module.exports.initModulesConfiguration = function(app, db){
  config.files.server.configs.forEach((configPath)=>{
    require(path.resolve(configPath))(app,db);
  });
};

module.exports.initModulesClientRoutes = function(app){
  //configurando archivos estaticos
  app.use('/',express.static(path.resolve('./public')));
/// routing estatico\
  config.folders.client.forEach((staticPath)=>{
    app.use(staticPath, express.static(path.resolve('./'+staticPath)));
  });
};

//invoca las politicas de roles
module.exports.initModulesServerPolicies = function(app){
  config.files.server.policies.forEach((policyPath)=>{
    require(path.resolve(policyPath)).invokesRolesPolicies();
  });
}

module.exports.initModulesServerRoutes = function(app){
  config.files.server.routes.forEach((routePath)=>{
    require(path.resolve(routePath))(app);
  });
};

module.exports.initErrorRoutes = function(app){
  app.use(function(err, req, res,next){
    if(!err){
      return next();
    }
    console.log(err.stack);
    res.redirect('/server-error');
  });
};

module.exports.init = function(db){
  var app = express();
  this.initLocalVariables(app);
  this.initMiddleware(app);
  this.initViewEngine(app);
  this.initSession(app,db);
  this.initModulesConfiguration(app,db);
  this.initModulesClientRoutes(app);
  this.initModulesServerPolicies(app);
  this.initModulesServerRoutes(app);
  this.initErrorRoutes(app);
  return app;
}
