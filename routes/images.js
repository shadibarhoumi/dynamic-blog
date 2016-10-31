var express = require('express');
var request = require('request');
var parser = require('xml2json');
var flickrAPI = require('../api/flickr');
var Photo = require('../models/Photo');

var imagesRouter = express.Router();

imagesRouter.get('/', function(req, res, next) {
  Photo.find({})
  .exec(function(err, photos) {
    res.json(photos);
  })
});

module.exports = imagesRouter;