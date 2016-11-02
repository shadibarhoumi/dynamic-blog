var request = require('request')
var parser = require('xml2json')
var mongoose = require('mongoose')
var moment = require('moment')
var Photo = require('../models/Photo')

var generateVideoUrl = function(flickrId, secret) {
  return `http://www.flickr.com/photos/148549829@N03/${flickrId}/play/hd/${secret}/`
}

var getPublicPhotos = function(callback) {
  request.get({
    url: 'https://api.flickr.com/services/rest/',
    qs: {
      method: 'flickr.people.getPublicPhotos',
      api_key: '47fc21b68eae73568eb03efbe8ebda67',
      user_id: '148549829@N03',
      per_page: 500,
      extras: ['date_taken', 'last_update', 'geo', 'tags', 'description', 'media', 'url_m'].join(','),
    }
  },
  function (error, response, body) {
    var imageData = parser.toJson(body, { object: true })
    callback(imageData)
  })
}

var ingestData = function() {
  getPublicPhotos(function(photoData) {
    photoData.rsp.photos.photo.forEach(function(photo) {
      var photoRecord = new Photo({
        flickrId: photo.id,
        title: photo.title,
        description: typeof photo.description === 'object' ? '' : photo.description,
        lastUpdate: moment(photo.lastupdate, 'x').toDate(),
        dateTaken: moment(photo.datetaken).toDate(),
        media: photo.media,
        tags: photo.tags,
        url_m: photo.url_m,
        secret: photo.secret,
        videoUrl: photo.media === 'video' ? generateVideoUrl(photo.id, photo.secret) : null
      })

      photoRecord.save(function(err, photoRecord) {
        if (err) {
          console.log('Error while ingesting photos from Flickr:', err)
          return
        }
        console.log('Ingested photo with id: ', photoRecord.id)
      })
    })
  })
}

var ingestDataIfNecessary = function() {
  Photo.count({}, function(err, count) {
    if (count === 0) {
      console.log('Database empty, beginning data ingestion.')
      ingestData()
    } else {
      console.log(`Database contains ${count} photos, not ingesting data.`)
    }
  })
}

module.exports = {
  getPublicPhotos: getPublicPhotos,
  ingestDataIfNecessary: ingestDataIfNecessary,
}