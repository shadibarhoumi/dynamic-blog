var express = require('express')
var request = require('request')
var parser = require('xml2json')
var flickrApi = require('../api/flickr')
var Photo = require('../models/Photo')
var moment = require('moment')

var photosRouter = express.Router()

photosRouter.get('/', function(req, res, next) {
  Photo.find({})
  .exec(function(err, photos) {
    res.json(photos)
  })
})

photosRouter.get('/date/:dateString', function(req, res, next) {
  var dayStart = moment(req.params.dateString, 'MM-DD-YYYY')
  var dayEnd = moment(dayStart).add(1, 'days')

  Photo.find({
    dateTaken: {
      $gte: dayStart.toDate(),
      $lte: dayEnd.toDate(),
    }
  })
  .exec(function(err, photos) {
    res.json(photos)
  })
})

photosRouter.get('/feed', function(req, res, next) {
  Photo.aggregate([
    { $group: {
        _id: '$dateStart',
        photos: {
          $push: '$$ROOT'
        }
      }
    },
    { $sort: {
        _id: -1
      }
    },
  ], function (err, result) {
    res.json(result)
  })
})

module.exports = photosRouter