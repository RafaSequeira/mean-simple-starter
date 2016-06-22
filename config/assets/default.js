//put all you assets in this file
'use stric'
module.exports = {
  client:{
    lib:{
      //bower css dependencies
      css:[
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
      ],
      // bowe js dependencies
      js:[
        'public/lib/angular/angular.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
      ],

    },
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    view:['modules/*/client/views/**/*.html']
  },
  server:{
    gruntConfig: ['GruntConfig.js'],
    allJS: ['server.js','config/**/*.js','modules/*/server/**/*.js'],
    models: 'modules/*/server/models/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    config: ['modules/*/server/config/*.js'],
    policies: ['modules/*/server/policies/*.js'],
    views: ['modules/*/server/views/*.html']
  },
}
