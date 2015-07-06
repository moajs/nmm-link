var express = require('express');
var router = express.Router();

// mount all middlewares in app/middlewares, examples:
// 
// router.route('/')
//  .get($middlewares.check_session_is_expired, $.list)
//  .post($.create);
// 
var $middlewares  = require('mount-middlewares')(__dirname);

// core controller
var $ = require('mount-controllers')(__dirname).share2s_controller;


/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /share2s[/]        => share2.list()
 *  GET    /share2s/new       => share2.new()
 *  GET    /share2s/:id       => share2.show()
 *  GET    /share2s/:id/edit  => share2.edit()
 *  POST   /share2s[/]        => share2.create()
 *  PATCH  /share2s/:id       => share2.update()
 *  DELETE /share2s/:id       => share2.destroy()
 *
 */

router.get('/new', $.new);  
router.get('/:id/edit', $.edit);

router.route('/')
  .get($.list)
  .post($.create);

router.route('/:id')
  .patch($.update)
  .get($.show)
  .delete($.destroy);


// -- custom routes




module.exports = router;