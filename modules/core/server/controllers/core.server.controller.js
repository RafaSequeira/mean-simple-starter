'use strict'

exports.renderIndex = function(req, res){

  res.render('modules/core/server/views/index');
};

exports.renderServerError = function(req, res){
  res.status(500).render('modules/core/server/views/500');
}
