// Sets global helpers/variables
// GitHub: https://github.com/petersirka/mongobuilder
require('mongobuilder');

var MC = require('mongodb').MongoClient;
var DB = null;

// Server waits for MongoDB
F.wait('database', true);

// Initializes MongoBD
MC.connect(CONFIG('database'), function(err, db) {

	// Disables waiting
	F.wait('database', false);

	if (err)
		F.error(err);

	// Caches MongoDB instance
	DB = db;
});

// Rewrites the framework database's prototype
F.database = function(collection) {
	if (collection)
		return DB.collection(collection);
	return DB;
};