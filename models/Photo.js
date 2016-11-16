var mongoose = require('mongoose')

var photoSchema = mongoose.Schema({
  flickrId: String,
  title: String,
  description: String,
  lastUpdate: Date,
  dateTaken: Date,
  dateStart: Date,
  media: String,
  tags: [String],
  url_m: String,
  secret: String,
  videoUrl: String,
})

var Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo