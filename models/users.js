NEWSCHEMA('UserLogin').make(function(schema) {

	schema.define('password', 'String(20)', true);
	schema.define('email', 'Email', true);

	schema.setValidate(function(name, value, path) {
		switch (name) {
			case 'password':
				if (!value.length)
					return false;
				if (value.length < 6)
					return 'error-password-short';
				return true;
		}
	});

	schema.addWorkflow('login', function(error, model, controller, callback) {

		var nosql = DB(error);

		nosql.select('user', 'users').make(function(builder) {
			builder.where('email', model.email);
			builder.where('password', model.password.sha1());
			builder.fields('_id');
			builder.first();
		});

		nosql.exec(function(err, response) {

			if (err)
				return callback();

			if (!response.user) {
				error.push('error-user-badcredencial');
				return callback();
			}

			// Create cookie with user ID
			controller.cookie('user', F.encrypt({ id: response.user._id }), '12 days');
			callback(SUCCESS(true));
		});
	});
});

// Schema definitions
NEWSCHEMA('User').make(function(schema) {

	schema.define('name', 'Capitalize(30)', true);
	schema.define('password', 'String(20)', true);
	schema.define('email', 'Email', true);

	schema.setValidate(function(name, value, path) {
		switch (name) {
			case 'password':
				if (!value.length)
					return false;
				if (value.length < 6)
					return 'error-password-short';
				return true;
		}
	});

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

		var nosql = DB(error);
		var id = new ObjectID();

		// Encrypts the password via SHA1 (you can use SHA256 or SHA512 or MD5)
		model.password = model.password.sha1();

		nosql.insert('users').make(function(builder) {
			builder.set(model);
			builder.set('_id', id);
			builder.set('created', new Date());
			builder.set('ip', controller.ip);
		});

		nosql.exec(function(err, repsonse) {

			if (err)
				return callback();

			// Create cookie with user ID
			controller.cookie('user', F.encrypt({ id: id }), '12 days');

			// Returns success
			callback(SUCCESS(true));
		});
	});

	schema.addWorkflow('check.email', function(error, model, user, callback) {

		var nosql = DB(error);

		nosql.exists('user', 'users').make(function(builder) {
			builder.where('email', model.email);
		});

		nosql.exec(function(err, response) {
			if (response.user)
				error.push('error-user-exists');
			callback();
		});
	});
});