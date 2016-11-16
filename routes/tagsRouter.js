var express = require('express')
var Photo = require('../models/Photo')

var tagsRouter = express.Router()

tagsRouter.get('/', function(req, res, next) {
  // Photo.distinct('tags')
  // .exec(function(err, tags) {
  //   res.json(tags)
  // })

  Photo.aggregate([
    { '$unwind': '$tags' },
    { '$group': {
      '_id': '$tags',
      'count': { '$sum': 1 },
    }},
    { '$sort': { 'count': -1 }}
  ], function (err, result) {
    res.json(result)
  })
})

module.exports = tagsRouter