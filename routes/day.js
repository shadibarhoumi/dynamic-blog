var express = require('express');
var flickrAPI = require('../api/flickr');

var dayRouter = express.Router();

dayRouter.get('/:date', function(req, res, next) {
	res.json({ 'date': req.params.date });
});

module.exports = dayRouter;