var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var router = express.Router()
var flickrApi = require('./api/flickr')
var appConstants = require('./appConstants')

//routes
var photosRouter = require('./routes/photosRouter')
var tagsRouter = require('./routes/tagsRouter')

var app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Request-Headers", "*")
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Credentials", "true")
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/photos/', photosRouter)
app.use('/api/tags/', tagsRouter)

var staticPath = 'public'
app.use(express.static(staticPath))
app.use('/', express.static(staticPath))
app.use('/feed', express.static(staticPath))
app.use('/tags', express.static(staticPath))
app.use('/about', express.static(staticPath))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.dir(err)
  res.status(err.status || 500)
  if(err.status === 500) {
    console.error(err.stack)
    res.json({error: 'Internal Server Error'})
  }
  else if(err.status === 404) {
    res.render('error') // render error page
  } else {
    res.json({error: err.message})
  }
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dynamic-blog')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('DB connected!')
})

flickrApi.ingestDataIfNecessary()
// pull in public Flickr data
// setInterval(flickrApi.fetchPhotos, appConstants.FLICKR_FETCH_INTERVAL)

module.exports = app
