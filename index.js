var Inflector = require('inflected');
var link = require('fs-symlink')

var plugin_root_path = __dirname;
// var current_path = process.cwd();

function create_symlink(source_path, dest_path, model_name) {
  var dest_arr = _get_files_arr(model_name);
  
  dest_arr.forEach(function(path){
    console.log(source_path + '/' + path);
  });
}

function remove_symlink(dest_path, model_name) {
  var dest_arr = _get_files_arr(model_name);
  
  dest_arr.forEach(function(path){
    console.log(plugin_root_path + '/' + path);
  });
}

function _link(dest_root_path){
  link(dir, dest_path + '/' + dir_name,  'junction').then(function () {
    console.log('copy modudle ' + dir_name + ' finished');
  })
}

function _get_files_arr(model_name){
  var model_names = Inflector.pluralize('' + model_name);

  var c = 'app/controllers/' + model_names + '_controller.js';
  var m = 'app/models/' + model_name + '.js';
  var v = 'app/views/' + model_names + '';
  var r = 'app/routes/'  + model_names + '.js';
  var a = 'app/routes/api/' + model_names + '.js';
  
  return [c,m,v,r,a];
}

exports.link    = create_symlink;
exports.unlink  = remove_symlink;

// module.exports = require('./lib/express');

create_symlink(plugin_root_path, '.','user') ;