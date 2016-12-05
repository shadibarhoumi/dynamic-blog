var mongoose = require('mongoose')

var photoSchema = mongoose.Schema({
  flickrId: String,
  title: String,
  description: String,
  lastUpdate: Date,
  dateTaken: Date,
  dateStart: Date,
  dateUpload: Date,
  media: String,
  tags: [String],
  sizes: {
    medium: {
      url: String,
      width: Number,
      height: Number,
    },
    large: {
      url: String,
      width: Number,
      height: Number,
    }
  },
  secret: String,
  videoUrl: String,
})

var Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo