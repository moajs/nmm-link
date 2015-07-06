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
var $ = require('mount-controllers')(__dirname).shares_controller;


/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /shares[/]        => share.list()
 *  GET    /shares/new       => share.new()
 *  GET    /shares/:id       => share.show()
 *  GET    /shares/:id/edit  => share.edit()
 *  POST   /shares[/]        => share.create()
 *  PATCH  /shares/:id       => share.update()
 *  DELETE /shares/:id       => share.destroy()
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