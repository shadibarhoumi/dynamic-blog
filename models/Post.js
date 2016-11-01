var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var postSchema = mongoose.Schema({
  title: String,
  categories: [String],
  content: String,
});

postSchema.plugin(timestamps);

var Post = mongoose.model('Post', postSchema);

module.exports = Post;