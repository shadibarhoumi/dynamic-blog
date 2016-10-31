var express = require('express');
var postsRouter = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


var postSchema = mongoose.Schema({
  title: String,
  categories: [String],
  content: String,
});

postSchema.plugin(timestamps);

var Post = mongoose.model('Post', postSchema);

postsRouter.get('/', function(req, res, next) {
  Post
    .find({})
    .select({
      content: 0,
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    })
    .limit(100)
    .sort({
      createdAt: -1
    })
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not retrieve posts'
        });
      }
      res.json(posts);
    });

});

postsRouter.post('/', function(req, res, next) {
  var body = req.body;
  var title = body.title;
  var categories = body.categories;
  var content = body.content;

  //simulate error if title, categories and content are all "test"
  //This is demo field-validation error upon submission.
  if (title === 'test' && categories === 'test' && content === 'test') {
    return res.status(403).json({
      title: 'Title Error',
      categories: 'Categories Error',
      content: 'Content Error',
      submitmessage: 'Ultimate Error!'
    });
  }

  if (!title || !categories || !content) {
    return res.status(400).json({
      message: 'Error title, categories and content are all required!'
    });
  }

  var post = new Post({
    title: title,
    categories: categories.split(','),
    content: content,
  });


  post.save(function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not save post'
      });
    }
    res.json(post);
  });
});

postsRouter.get('/:id', function(req, res, next) {
  Post.findById({
    '_id': req.params.id
  }, function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve post w/ that id'
      });
    }
    if(!post) {
    	return res.status(404).json({message: 'Post not found'})
    }
    res.json(post);
  });
});

postsRouter.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  if (id.length != 24) {
    return res.json({
      message: 'id must be a valid 24 char hex string'
    });
  }
  var id = mongoose.Types.ObjectId(req.params.id); //convert to objectid
  Post.findByIdAndRemove(id, function(err, post) {
    if (err) throw err;

    if(!post) {
    	return res.status(404).json({message: 'Could not delete post'});
    }

    res.json({
      result: 'Post was deleted'
    });

  });
});

postsRouter.post('/validate/fields', function(req, res, next) {
  var body = req.body;
  var title = body.title ? body.title.trim() : '';

  Post.findOne({
    'title': new RegExp(title, "i")
  }, function(err, post) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not find post for title uniqueness'
      });
    }
    if (post) {
      res.json({
        title: 'Title "' + title + '" is not unique!'
      });
    } else {
      return res.json({});
    }

  });
});


module.exports = postsRouter;