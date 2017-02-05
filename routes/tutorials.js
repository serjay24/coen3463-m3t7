var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Entry = require('../models/entry');

var date = new Date();
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

var mdbUrl = "mongodb://admin:admin@ds111589.mlab.com:11589/top-youtube-videos-for-node-js-express-js"

var addStatus;
/*
router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});
*/
//GET List of Tutorials
router.get('/', function(req, res){
  Entry.find().sort({created: 'descending'}).exec(function(err, tutorials){
    res.render('all_entries', {
        title: 'All Entries',
        tutorials: tutorials,
        user: req.user
      });
  })
});

router.post('/', function(req, res){
  res.redirect('/tutorials')
})

//GET New Entry Page
router.get('/new', function(req, res) {
  console.log();
  var data = {
    title: 'Add New Entry',
    status: addStatus,
    user: req.user
  }
  res.render('new_entry', data);
  addStatus = "";
});

//POST New Entry Details
router.post('/new', function(req, res){
  var dataToSave = {
    title: req.body.title,
    uploadersName: req.body.uploadersName,
    uploadersYoutubeLink: req.body.uploadersYoutubeLink,
    youtubeLink: req.body.youtubeLink,
    description: req.body.description,
    publishDate: req.body.publishDate,
    category: req.body.category,
    views: req.body.views,
    likes: req.body.likes,
    created: getDate,
    updated: getDate,
    embed: req.body.embed
  };

  var data = new Entry(dataToSave);
  data.save(function(err, tutorial){
    if(err) {
      console.log('Saving Data Failed!');
      addStatus = 'Saving Data Failed!';
    }
    else {
      console.log('Saving Data Successful!');
      addStatus = 'Saving Data Success';
      res.redirect('/tutorials/new');
    }
  });
});

router.get('/:videoId', function(req, res) {
  var videoId = req.params.videoId;
  Entry.findById(videoId, function(err, info){
    res.render('entry', {
        title: info.title,
        videoInfo: info,
        user: req.user
      });
  });
});

router.get('/:videoId/edit', function(req, res) {
  var videoId = req.params.videoId;

  Entry.findById(videoId, function(err, info) {
    res.render('update_entry', {
        title: 'Update Entry',
        videoInfo: info,
        user: req.user
    })
  })
});

router.post('/:videoId', function(req, res){
  var videoId = req.params.videoId;

  var newData = {
    title: req.body.title,
    uploadersName: req.body.uploadersName,
    uploadersYoutubeLink: req.body.uploadersYoutubeLink,
    youtubeLink: req.body.youtubeLink,
    description: req.body.description,
    publishDate: req.body.publishDate,
    category: req.body.category,
    views: req.body.views,
    likes: req.body.likes,
    embed: req.body.embed,
    updated: getDate
  }

  Entry.update({_id: videoId}, {$set: newData}, function(err, result){
    if(err) {
      console.log("Item not updated!");
    }
    else {
      console.log("Item Updated!")
      res.redirect('/tutorials/' + videoId)
    }
  });
});

router.get('/:videoId/delete', function(req, res){
  var videoId = req.params.videoId;
  Entry.findByIdAndRemove(videoId).exec();
  res.redirect('/tutorials')
})

module.exports = router;