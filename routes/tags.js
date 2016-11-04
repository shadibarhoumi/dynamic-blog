var express = require('express')
var Photo = require('../models/Photo')

var tagsRouter = express.Router()

tagsRouter.get('/', function(req, res, next) {
  Photo.distinct('tags')
  .exec(function(err, tags) {
    res.json(tags)
  })
})

tagsRouter.get('/:tagName', function(req, res, next) {
  var tag = '#' + req.params.tagName
  Photo.find({ tags: tag })
  .exec(function(err, photos) {
    res.json(photos)
  })
})

module.exports = tagsRouter