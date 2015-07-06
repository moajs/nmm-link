/**
 * Created by alfred on July 6th 2015, 8:30:02 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var shareSchema = new Schema(
    {"content":"String","topic_id":"String","user_id":"String"}
);

var Share = mongoose.model('Share', shareSchema);
var ShareDao = new MongooseDao(Share);
 
module.exports = ShareDao;