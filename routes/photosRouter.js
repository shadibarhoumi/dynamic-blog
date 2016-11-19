var express = require('express')
var request = require('request')
var parser = require('xml2json')
var flickrApi = require('../api/flickr')
var Photo = require('../models/Photo')
var moment = require('moment')

var photosRouter = express.Router()

// TAGS
photosRouter.get('/byTag', function(req, res, next) {
  Photo.aggregate([
    { '$unwind': '$tags' },
    { $sort: { 'dateTaken': -1 } },
    { '$group': {
      '_id': '$tags',
      'count': { '$sum': 1 },
      'photos': {
        '$push': '$$ROOT'
      }
    }},
    { '$sort': { 'count': -1 }}
  ], function (err, result) {
    res.json(result)
  })
})

photosRouter.get('/tags/:tag', function(req, res, next) {
  Photo.find({
    tags: req.params.tag
  })
  .exec(function(err, photos) {
    res.json(photos)
  })
})

// DATES
photosRouter.get('/byDate', function(req, res, next) {
  Photo.aggregate([
    { $sort: { 'dateTaken': -1 } },
    { $group: {
        _id: '$dateStart',
        count: { '$sum': 1 },
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

module.exports = photosRouter