var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var date = new Date();

var index = require('./routes/index');
var users = require('./routes/users');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var addStatus;
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

var mdbUrl = "mongodb://admin:admin@ds111589.mlab.com:11589/top-youtube-videos-for-node-js-express-js"

MongoClient.connect(mdbUrl, function(err, database) {
    if (err) {
        console.log(err)
        return;
    }

    console.log("Connected to DB!");

    // set database
    db = database;

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', index);
	
	//List all the entries
	app.get('/tutorials', function(req, res) {
		var tutorialCollection = db.collection('tutorials');
		tutorialCollection.find().toArray(function(err, tutorials) {
			console.log('Tutorials Loaded!');
			res.render('all_entries', {
				tutorials: tutorials
			});
		})
	});

	//Adding New Entry
	app.get('/tutorials/new', function(req, res) {
		console.log();
		var data = {
			status: addStatus
		}
		res.render('new_entry', data);
		addStatus = "";
	});

	//POST Method when submitting new Entry
	app.post('/tutorials/new', function(req, res) {
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

		db.collection('tutorials')
		  .save(dataToSave, function(err, tutorial) {
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

	//Page of each Entry
	app.get('/tutorials/:videoId', function(req, res) {
		var videoId = req.params.videoId;
		var tutorialCollection = db.collection('tutorials');
		tutorialCollection.findOne({_id: new ObjectId(videoId)}, function(err, info) {
			res.render('entry', {
				videoInfo: info
			});
		}); 
	});

	//Edit Page
	app.get('/tutorials/:videoId/edit', function(req, res) {
		var videoId = req.params.videoId;
		var tutorialCollection = db.collection('tutorials');
		tutorialCollection.findOne({_id: new ObjectId(videoId)}, function(err, info) {
			res.render('update_entry', {
				videoInfo: info
			});
		}); 
	})

	//POST Method when updating an entry
	app.post('/tutorials/:videoId', function(req, res){

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

		
		var tutorialCollection = db.collection('tutorials');
		tutorialCollection.updateOne({_id: new ObjectId(videoId)}, {$set: newData}, function(err, result) {
			if(err) {
				console.log("Item not updated!");
			}
			else {
				console.log("Item Updated!")
				res.redirect('/tutorials/:videoId')
			}
		}); 
	});

	//Delete Entry
	app.get('/tutorials/:videoId/delete', function(req, res){
		var videoId = req.params.videoId;
		
		var tutorialCollection = db.collection('tutorials');
		tutorialCollection.deleteOne({_id: new ObjectId(videoId)}, function(err, result) {
			if(err) {
				console.log("Item not deleted!");
			}
			else {
				console.log("Item deleted!")
				res.redirect('/tutorials')
			}
		}); 
	});

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
  		var err = new Error('Not Found');
  		err.status = 404;
  		next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
  		// set locals, only providing error in development
  		res.locals.message = err.message;
  		res.locals.error = req.app.get('env') === 'development' ? err : {};

  		// render the error page
  		res.status(err.status || 500);
  		res.render('error');
	});
});

module.exports = app;
