var defaultAssets = require('./config/assets/default.js');

module.exports = function(grunt){
  grunt.initConfig({
    nodemon:{
      dev:{
        script: 'server.js'
      },
    },
  });
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('default',['nodemon']);
}
