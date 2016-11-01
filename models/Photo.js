var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
  flickrId: String,
  title: String,
  description: String,
  lastUpdate: Date,
  dateTaken: Date,
  tags: String,
  url_m: String,
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;