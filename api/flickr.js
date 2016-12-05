var request = require('request')
var parser = require('xml2json')
var mongoose = require('mongoose')
var moment = require('moment')
var Photo = require('../models/Photo')

// constants
var ONE_MINUTE = 1 * 60 * 60
var FIVE_SECONDS = 5000
var INITIAL_PHOTO_FETCH_PAGE_SIZE = 500
var PHOTO_FETCH_LOOP_PAGE_SIZE = 50

// tracks whether we are fetching first photos
var performingInitialFetch = false

// helpers
var extractTags = function(title) {
  var tags = title.match(/#[A-Za-z0-9]+/g)
  return tags === null ? [] : tags.map(tag => tag.substring(1))
}

var generateVideoUrl = function(flickrId, secret) {
  return `http://www.flickr.com/photos/148549829@N03/${flickrId}/play/hd/${secret}/`
}

// insert Photo into DB
var insertPhoto = function(photo) {
  // get sizes of photo
  getPhotoSizes(photo.id, function(data) {
    // console.log('photo sizes', data.rsp.sizes.size)

    var sizeData = data.rsp.sizes.size
    var mediumSizeData = sizeData[7]
    var largeSizeData = sizeData[8]

    var photoRecord = new Photo({
      flickrId: photo.id,
      title: photo.title,
      description: typeof photo.description === 'object' ? '' : photo.description,
      lastUpdate: moment(photo.lastupdate, 'x').toDate(),
      dateTaken: moment(photo.datetaken).toDate(),
      dateStart: moment(photo.datetaken).startOf('day').toDate(),
      dateUpload: moment(photo.dateupload, 'x').toDate(),
      media: photo.media,
      tags: extractTags(photo.title),
      flickrTags: photo.tags,
      sizes: {
        medium: {
          url: mediumSizeData.source,
          width: mediumSizeData.width,
          height: mediumSizeData.height,
        },
        large: {
          url: largeSizeData.source,
          width: largeSizeData.width,
          height: largeSizeData.height,
        }
      },
      videoUrl: photo.media === 'video' ? generateVideoUrl(photo.id, photo.secret) : null
    })

    photoRecord.save(function(err, photoRecord) {
      if (err) {
        console.log('Error while ingesting photos from Flickr:', err)
        return
      }
    })
  })
}

// call flickr.photos.getSizes method
var getPhotoSizes = function(photoId, callback) {
  request.get({
    url: 'https://api.flickr.com/services/rest/',
    qs: {
      method: 'flickr.photos.getSizes',
      api_key: '47fc21b68eae73568eb03efbe8ebda67',
      photo_id: photoId,
    }
  },
  function (error, response, body) {
    if (body === undefined) return
    var sizes = parser.toJson(body, { object: true })
    callback(sizes)
  })
}

// call flickr.getPublicPhotos method
var getPublicPhotos = function(perPage, page, callback) {
  // check if page argument was passed in
  if (typeof page === 'function') {
    callback = page
    page = 1
  }

  request.get({
    url: 'https://api.flickr.com/services/rest/',
    qs: {
      method: 'flickr.people.getPublicPhotos',
      api_key: '47fc21b68eae73568eb03efbe8ebda67',
      user_id: '148549829@N03',
      per_page: perPage,
      page: page,
      extras: [
        'date_taken', 'last_update', 'geo',
        'tags', 'description', 'media',
        'date_upload', 'url_c',
      ].join(','),
    }
  },
  function (error, response, body) {
    if (body === undefined) return
    var photoData = parser.toJson(body, { object: true })
    callback(photoData)
  })
}

// start service which performs initial photo fetch
// and continuously checks for new photos
var startPhotoService = function() {
  Photo.count({}, function(err, count) {
    if (count === 0) {
      fetchAllPhotos()
      startPhotoFetchLoop()
    } else {
      startPhotoFetchLoop()
    }
  })
}

// fetch all photos in flickr
var fetchAllPhotos = function() {
  console.log('Database empty, fetching all photos.')
  fetchAllPages(INITIAL_PHOTO_FETCH_PAGE_SIZE)
}

// recursive wrapper for fetchPage
var fetchAllPages = function(pageSize) {
  performingInitialFetch = true
  console.log('Fetching page 1')
  fetchPage(pageSize, 1)
}

// recursively fetch all pages of photos
var fetchPage = function(pageSize, page) {
  getPublicPhotos(pageSize, page, function(photoData) {
    totalPages = photoData.rsp.photos.pages || 1
    // print total pages if we're on first page
    if (page === 1) console.log('Total pages: ' + totalPages)

    var newPhotos = 0
    // insert all photos
    if (Array.isArray(photoData.rsp.photos.photo)) { // array of photos
      photoData.rsp.photos.photo.forEach(function(photo) {
        insertPhoto(photo)
        newPhotos++
      })
    } else { // single photo
      insertPhoto(photoData.rsp.photos.photo)
      newPhotos++
    }
    console.log('Inserted ' + newPhotos + ' photos')

    // fetch next page
    if (page < totalPages) {
      console.log('Fetching page', page + 1)
      fetchPage(pageSize, page + 1)
    } else {
      console.log('Fetched all pages')
      performingInitialFetch = false
    }
  })
}

// run loop that fetches new photos
var startPhotoFetchLoop = function() {
  setInterval(fetchNewPhotos, FIVE_SECONDS)
}

// fetch small number of recent photos and
// add new photos to database
var fetchNewPhotos = function() {
  // do not try to fetch new photos if performing initial fetch
  if (performingInitialFetch) return

  console.log('Checking for new photos...')
  var newPhotos = 0
  getPublicPhotos(PHOTO_FETCH_LOOP_PAGE_SIZE, function(photoData) {
    photoData.rsp.photos.photo.forEach(function(photo) {
      Photo.find({ flickrId: photo.id }) // check if photo is in db already
      .exec(function(err, result) {
        if (result.length === 0) {
          insertPhoto(photo)
          newPhotos++
        }
      })
    })
  console.log('Inserted ' + newPhotos + ' new photos.')
  })
}

module.exports = {
  startPhotoService: startPhotoService
}