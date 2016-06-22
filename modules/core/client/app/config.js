(function(window){
  'use strict'
  var appName = 'sample';
  var service = {
    applicationModuleName: appName,
    applicationModuleDependencies : ['ui.router','ui.bootstrap'],
    registerModule: registerModule
  };
  window.AppConfiguration = service;
  // function que registra un nuevo modulo
   function registerModule(moduleName, dependencies){
    // se regsitra un nuevo module de angular
    angular.module(moduleName, dependencies || []);
    // agrega el nuevo modulo como dependencia del modulo principal de aplicacion
    angular.module(appName).requires.push(moduleName);
  }

})(window);
