'use strict'

var core = require('../controllers/core.server.controller');
module.exports = function(app){
  app.route('/server-error').get(core.renderServerError);
  app.route('/*').get(core.renderIndex);

}
