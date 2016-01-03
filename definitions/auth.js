// This definition describes users authorization
// Stores online users
var ONLINE = {};
var EXPIRE = '10 minutes';

// Creates cookie-user-authorization
F.onAuthorize = function(req, res, flags, callback) {

	var cookie = req.cookie('user');
	if (!cookie || cookie.length < 10)
		return callback(false);

	var obj = F.decrypt(cookie);
	if (!obj || !obj.id)
		return callback(false);

	var session = ONLINE[obj.id];
	if (session) {
		session.expire = new Date().add(EXPIRE).getTime();
		return callback(true, session);
	}

	var builder = new MongoBuilder();
	builder.where('_id', ObjectID.parse(obj.id));
	builder.findOne(DB('users'), function(err, user) {

		if (err) {
			F.error(err);
			return callback(false);
		}

		if (!user)
			return callback(false);

		session = user;
		session.expire = new Date().add(EXPIRE).getTime();
		ONLINE[user._id.toString()] = session;

		callback(true, session);
	});
};

// Cleaning online users (their session from memory)
F.on('service', function(interval) {

	// Each 5 minutes
	if (interval % 5 !== 0)
		return;

	var keys = Object.keys(ONLINE);
	var now = Date.now();

	for (var i = 0, length = keys.length; i < length; i++) {
		var key = keys[i];
		var user = ONLINE[key];
		if (user.expire < now)
			delete ONLINE[key];
	}

});