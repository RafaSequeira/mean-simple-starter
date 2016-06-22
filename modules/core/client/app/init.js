(function(app){
  'use strict'
  //definiendo el modulo principal de
  angular.module(app.applicationModuleName,app.applicationModuleDependencies);
  angular.module(app.applicationModuleName).config(bootstrapConfig);

  function bootstrapConfig($locationProvider, $httpProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
  };
  bootstrapConfig.$inject = ['$locationProvider', '$httpProvider'];
  angular.element(document).ready(init);
  function init(){
    angular.bootstrap(document, [app.applicationModuleName]);
  }
})(AppConfiguration);
