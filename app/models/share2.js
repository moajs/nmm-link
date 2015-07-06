/**
 * Created by alfred on July 6th 2015, 11:11:33 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var share2Schema = new Schema(
    {"content":"String","topic_id":"String","user_id":"String"}
);

var Share2 = mongoose.model('Share2', share2Schema);
var Share2Dao = new MongooseDao(Share2);
 
module.exports = Share2Dao;