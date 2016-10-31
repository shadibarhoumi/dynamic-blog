var express = require('express');
var request = require('request');
var parser = require('xml2json');
var parseString = require('xml2js').parseString;

var imagesRouter = express.Router();

imagesRouter.get('/', function(req, res, next) {
  request.get('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=47fc21b68eae73568eb03efbe8ebda67&user_id=148549829%40N03&extras=date_taken%2C%20last_update',
    function (error, response, body) {
      // if (error || response.statusCode != 200) // deal with error

      // parseString(body, function(err, result) {
      //   res.json(result);
      // });

      var imageData = parser.toJson(body, { object: true });
      var photoUrls = imageData.rsp.photos.photo.map(function(photo) {
        return {
          url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
          title: photo.title
        }
      });
      res.json(photoUrls);
  });
});

module.exports = imagesRouter;