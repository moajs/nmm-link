var o = require('./index')

var plugin_root_path = __dirname;
o.link(plugin_root_path, plugin_root_path + '/app2','share') ;

// remove_symlink(plugin_root_path + '/app2','share') ;