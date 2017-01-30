var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var entrySchema = new Schema({
    title: {
    	type: String,
    	required: true
    },
    uploadersName: {
    	type: String,
    	required: true
    },
    uploadersYoutubeLink: {
    	type: String,
    	required: true
    },
    youtubeLink: {
    	type: String,
    	required: true
    },
    description: String,
    publishDate: String,
    category: String,
    views: String,
    likes: String,
    created: String,
    updated: String,
    embed: String,
},
{
    collection: 'tutorials'
});

module.exports = mongoose.model('Entry', entrySchema);