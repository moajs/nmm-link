/**
 * Created by Moajs on July 6th 2015, 11:11:33 pm.
 */

var $models = require('mount-models')(__dirname);

var Share2 = $models.share2;

exports.list = function (req, res, next) {
  console.log(req.method + ' /share2s => list, query: ' + JSON.stringify(req.query));
  
  Share2.getAll(function(err, share2s){
    console.log(share2s);
    res.render('share2s/index', {
      share2s : share2s
    })
  });
};

exports.new = function (req, res, next) {
  console.log(req.method + ' /share2s/new => new, query: ' + JSON.stringify(req.query));
  
  res.render('share2s/new', {
    share2 : {
      "_action" : "new"
    }
  })
};

exports.show = function (req, res, next) {
  console.log(req.method + ' /share2s/:id => show, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params));
  var id = req.params.id;
  
  Share2.getById(id, function(err, share2) {
    console.log(share2);
    res.render('share2s/show', {
      share2 : share2
    })
  });
};

exports.edit = function (req, res, next) {
  console.log(req.method + ' /share2s/:id/edit => edit, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params));
    
  var id = req.params.id; 
  
  Share2.getById(id, function (err, share2) {
    console.log(share2);
    share2._action = 'edit';
    
    res.render('share2s/edit', {
      share2 : share2
    })
  });
};

exports.create = function (req, res, next) {
  console.log(req.method + ' /share2s => create, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
  
  Share2.create({content: req.body.content,topic_id: req.body.topic_id,user_id: req.body.user_id}, function (err, share2) {
    console.log(share2);
    res.render('share2s/show', {
      share2 : share2
    })
  });
};

exports.update = function (req, res, next) {
  console.log(req.method + ' /share2s/:id => update, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    
  var id = req.params.id; 

  Share2.updateById(id,{content: req.body.content,topic_id: req.body.topic_id,user_id: req.body.user_id}, function (err, share2) {
    console.log(share2);
  
    res.json({
      data: {
        redirect : '/share2s/' + id
      },
      status: {
        code : 0,
        msg  : 'delete success!'
      }
    });
  });
};

exports.destroy = function (req, res, next) {
  var id = req.params.id;
  Share2.deleteById(id, function (err) {
    if (err) {
      throw new Error(err);
    }
    
    res.json({
      data: {},
      status: {
        code : 0,
        msg  : 'delete success!'
      }
    });
  });
};

// -- custom api

exports.api = {
  list: function (req, res, next) {
    var user_id = req.api_user._id;
    
    Share2.query({}, function (err, share2s) {
      if (err) {
        return res.api_error(err);
      }
      
      res.api({
        share2s : share2s
      })
    });
  },
  show: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.share2_id;
    
    Share2.getById(id, function (err, share2) {
      if (err) {
        return res.api_error(err);
      }
      
      res.api({
        share2 : share2
      });
    }); 
  },
  create: function (req, res, next) {
    var user_id = req.api_user._id;
  
    Share2.create({content: req.body.content,topic_id: req.body.topic_id,user_id: req.body.user_id}, function (err, share2) {
      if (err) {
        return res.api_error(err);
      }
      
      res.json({
        share2 : share2
      })
    });
  },
  update: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.share2_id; 
    Share2.updateById(id, {content: req.body.content,topic_id: req.body.topic_id,user_id: req.body.user_id}, function (err, share2) {
      if (err) {
        return res.api_error(err);
      }
  
      res.api({
        share2 : share2,
        redirect : '/share2s/' + id
      })
    });
  },
  delete: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.share2_id; 
    
    Share2.deleteById(id, function (err) {
      if (err) {
        return res.api_error(err);
      }
    
      res.api({id: id})
    });
  }
}
