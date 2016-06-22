(function(){
  'use strict'
  angular.module('core').config(routeConfig);
  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routeConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.rule(function($injector, $location){
      var path = $location.path();
      var hasTrailingSlashes = path.length > 1 && path[path.length - 1 ] === '/';
      if(hasTrailingSlashes){
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });
    // if the url is not routed, redirect to not found
    $urlRouterProvider.otherwise(function($inject, $location){
      $injector.get('$state').transitionTo('not-found',null,{location: false});
    });
    //routing
    $stateProvider.state('home',{
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html',
    });
  };
})();
