var request = require('request');
var parser = require('xml2json');
var mongoose = require('mongoose');
var moment = require('moment');
var Photo = require('../models/Photo');

var getPublicPhotos = function(callback) {
  request.get({
    url: 'https://api.flickr.com/services/rest/',
    qs: {
      method: 'flickr.people.getPublicPhotos',
      api_key: '47fc21b68eae73568eb03efbe8ebda67',
      user_id: '148549829@N03',
      per_page: 500,
      extras: ['date_taken', 'last_update', 'geo', 'tags', 'description', 'url_m'].join(','),
    }
  },
  function (error, response, body) {
    var imageData = parser.toJson(body, { object: true });
    callback(imageData)
  });
};

var ingestData = function() {
  console.log('beginning data ingestion');
  getPublicPhotos(function(photoData) {
    photoData.rsp.photos.photo.forEach(function(photo) {
      var photoRecord = new Photo({
        id: photo.id,
        title: photo.title,
        description: typeof photo.description === "object" ? '' : photo.description,
        lastUpdate: new Date(),
        dateTaken: moment(photo.datetaken).toDate(),
        tags: photo.tags,
        url_m: photo.url_m
      });

      photoRecord.save(function(err, photoRecord) {
        if (err) {
          console.log('Error while ingesting photos from Flickr:', err);
          return
        }
        console.log('Ingested photo with id: ', photoRecord.id);
      });
    });
  });
};

module.exports = {
  getPublicPhotos: getPublicPhotos,
  ingestData: ingestData,
};