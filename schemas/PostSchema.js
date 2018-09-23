var mongoose = require('mongoose')
Schema = mongoose.Schema;
///должность
var PostSchema = Schema({
  PostName: String,
})
module.exports = mongoose.model('Post', PostSchema);
