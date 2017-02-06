var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var User = new Schema({
    username: {
    	type: String,
    	required: true
    },
    password: {
    	type: String,
    	required: true
    },
    email: {
    	type: String,
    	required: true
    },
    first_name: String,
    last_name: String,
});

var User = module.exports = mongoose.model('User', User);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
        	newUser.password = hash;
        	newUser.save(callback);
    	});
	});
}

module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
	    if(err) throw err;
	    callback(null, isMatch);
	});
}