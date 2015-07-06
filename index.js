var Inflector = require('inflected');
var link      = require('fs-symlink');
var fs        = require('fs');

var plugin_root_path = __dirname;
// var current_path = process.cwd();

function create_symlink(source_path, dest_path, model_name) {
  var dest_arr = _get_files_arr(model_name);
  
  dest_arr.forEach(function(path){
    // console.log(source_path + '/' + path);
    // console.log(dest_path + '/' + path);
    _link(source_path + '/' + path, dest_path + '' + path)
  });
}

function remove_symlink(dest_path, model_name) {
  var dest_arr = _get_files_arr(model_name);
  
  dest_arr.forEach(function(path){
    console.log(dest_path + '/' + path);
    _unlink(dest_path + '/' + path);
  });
}

function _unlink(dest_root_path){
  var l = fs.readlinkSync(dest_root_path);
  if(l){
    fs.unlinkSync(dest_root_path);
  }
}

function _link(soure_root_path, dest_root_path){
  console.log(soure_root_path);
  console.log(dest_root_path);
  
  // return;
  link(soure_root_path, dest_root_path,  'junction').then(function () {
    console.log('copy modudle ' + dest_root_path + ' finished');
  })
}

function _get_files_arr(model_name){
  var model_names = Inflector.pluralize('' + model_name);

  var c = 'app/controllers/' + model_names + '_controller.js';
  var m = 'app/models/' + model_name + '.js';
  var v = 'app/views/' + model_names + '';
  var r = 'app/routes/'  + model_names + '.js';
  var a = 'app/routes/api/' + model_names + '.js';
  
  return [c, m, v, r, a];
}

exports.simple_link    = _link;
exports.link    = create_symlink;
exports.unlink  = remove_symlink;

// module.exports = require('./lib/express');

