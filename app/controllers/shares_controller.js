/**
 * Created by Moajs on July 6th 2015, 8:30:02 pm.
 */

var $models = require('mount-models')(__dirname);

var Share = $models.share;

exports.list = function (req, res, next) {
  console.log(req.method + ' /shares => list, query: ' + JSON.stringify(req.query));
  
  Share.getAll(function(err, shares){
    console.log(shares);
    res.render('shares/index', {
      shares : shares
    })
  });
};

exports.new = function (req, res, next) {
  console.log(req.method + ' /shares/new => new, query: ' + JSON.stringify(req.query));
  
  res.render('shares/new', {
    share : {
      "_action" : "new"
    }
  })
};

exports.show = function (req, res, next) {
  console.log(req.method + ' /shares/:id => show, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params));
  var id = req.params.id;
  
  Share.getById(id, function(err, share) {
    console.log(share);
    res.render('shares/show', {
      share : share
    })
  });
};

exports.edit = function (req, res, next) {
  console.log(req.method + ' /shares/:id/edit => edit, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params));
    
  var id = req.params.id; 
  
  Share.getById(id, function (err, share) {
    console.log(share);
    share._action = 'edit';
    
    res.render('shares/edit', {
      share : share
    })
  });
};

exports.create = function (req, res, next) {
  console.log(req.method + ' /shares => create, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
  
  Share.create({content: req.body.content,topic_id: req.body.topic_id,user_id: req.body.user_id}, function (err, share) {
    console.log(share);
    res.render('shares/show', {
      share : share
    })
  });
};

exports.update = function (req, res, next) {
  console.log(req.method + ' /shares/:id => update, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    
  var id = req.params.id; 

  Share.updateById(id,{content: req.body.content,topic_id: req.body.topic_id,user_id: req.body.user_id}, function (err, share) {
    console.log(share);
  
    res.json({
      data: {
        redirect : '/shares/' + id
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
  Share.deleteById(id, function (err) {
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
    
    Share.query({}, function (err, shares) {
      if (err) {
        return res.api_error(err);
      }
      
      res.api({
        shares : shares
      })
    });
  },
  show: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.share_id;
    
    Share.getById(id, function (err, share) {
      if (err) {
        return res.api_error(err);
      }
      
      res.api({
        share : share
      });
    }); 
  },
  create: function (req, res, next) {
    var user_id = req.api_user._id;
  
    Share.create({content: req.body.content,topic_id: req.body.topic_id,user_id: req.body.user_id}, function (err, share) {
      if (err) {
        return res.api_error(err);
      }
      
      res.json({
        share : share
      })
    });
  },
  update: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.share_id; 
    Share.updateById(id, {content: req.body.content,topic_id: req.body.topic_id,user_id: req.body.user_id}, function (err, share) {
      if (err) {
        return res.api_error(err);
      }
  
      res.api({
        share : share,
        redirect : '/shares/' + id
      })
    });
  },
  delete: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.share_id; 
    
    Share.deleteById(id, function (err) {
      if (err) {
        return res.api_error(err);
      }
    
      res.api({id: id})
    });
  }
}
