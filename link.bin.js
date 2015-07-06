#!/usr/bin/env node

// print process.argv
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

var o = require('./index')
var current_path = process.cwd();

console.log(current_path);

var plugin_root_path = __dirname;
var arr = current_path.split('node_modules');

var dirw = require('dirw');
var fs = require('fs')
var path_arr = current_path.split('/');
path_arr.pop()
path_arr.pop()

var moajs_project_dir = path_arr.join('/')
console.log('moajs_project_dir=' + moajs_project_dir);


if(arr.length == 2){
  var dest = arr[0];
  // o.link(current_path, dest,'share') ;
  dirw.walk(current_path + '/app', 0, handleFile);
  
  console.log('moajs插件完成!')
}else{
  console.log('安装请在moajs项目根目录!')
}

// o.link(current_path, current_path + '/app2','share') ;
// remove_symlink(plugin_root_path + '/app2','share') ;

function link(p){
  var new_path_arr = p.split('app')

  var d = moajs_project_dir + '/app' + new_path_arr[1] 
  console.log('LINK + ' + d)
  
  o.simple_link(p, d);
}

function handleFile(path, floor) {
	fs.stat(path, function(err1, stats) {
		if (err1) {
			console.log('stat error');
		} else {
  			if (stats.isDirectory()) {
          if( path.match('/app/views/.*') ){
            link(path)
            return console.log('view=' + path);
          }
        }else{
          if( path.match('/app/views/*/*') ){
            // return console.log('view2=' + path);
          }else{
            console.log(path + '-' + floor)       
            link(path)
          } 
        }
    }
  });
}