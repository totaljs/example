NEWSCHEMA('UserLogin').make(function(schema) {

	schema.define('password', 'String(20)', true);
	schema.define('email', 'String(200)', true);

	schema.addWorkflow('login', function(error, model, controller, callback) {
		var builder = new MongoBuilder();
		builder.where('email', model.email);
		builder.where('password', model.password.sha1());
		builder.fields('_id');
		builder.findOne(DB('users'), function(err, user) {

			if (err) {
				error.push(err);
				return callback();
			}

			if (!user) {
				error.push('error-user-badcredencial');
				return callback();
			}

			// Create cookie with user ID
			controller.cookie('user', F.encrypt({ id: user._id }), '12 days');
			callback(SUCCESS(true));
		});
	});
});

// Schema definitions
NEWSCHEMA('User').make(function(schema) {

	schema.define('name', 'String(30)', true);
	schema.define('password', 'String(20)', true);
	schema.define('email', 'String(200)', true);

	schema.setQuery(function(error, options, callback) {
		error.push('error-notimplemented');
		callback();
	});

	schema.setGet(function(error, model, options, callback) {
		error.push('error-notimplemented');
		callback();
	});

	schema.setRemove(function(error, options, callback) {
		error.push('error-notimplemented');
		callback();
	});

	schema.setSave(function(error, model, controller, callback) {

		var builder = new MongoBuilder();
		var id = new ObjectID();

		// Encrypts the password via SHA1 (you can use SHA256 or SHA512 or MD5)
		model.password = model.password.sha1();

		// Bind user's data
		builder.set(model);
		builder.set('_id', id);
		builder.set('created', new Date());
		builder.set('ip', controller.ip);

		builder.save(DB('users'), function(err) {

			if (err) {
				error.push(err);
				return callback();
			}

			// Create cookie with user ID
			controller.cookie('user', F.encrypt({ id: id }), '12 days');

			// Returns success
			callback(SUCCESS(true));
		});
	});

	schema.addWorkflow('check.email', function(error, model, user, callback) {
		var builder = new MongoBuilder();
		builder.where('email', model.email);
		builder.exists(DB('users'), function(err, e) {

			if (err) {
				error.push(err);
				return callback();
			}

			if (e) {
				error.push('error-user-exists');
				return callback();
			}

			callback();
		});
	});
});