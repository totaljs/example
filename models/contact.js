NEWSCHEMA('Contact').make(function(schema) {

	schema.define('name', 'Capitalize(30)', true);
	schema.define('email', 'Email', true);
	schema.define('body', String, true);

	schema.setSave(function(error, model, controller, callback) {

		var nosql = DB();

		nosql.insert('contact').make(function(builder) {
			builder.set(model);
			builder.set('iduser', controller.user ? controller.user._id : null);
			builder.set('created', new Date());
			builder.set('ip', controller.ip);
		});

		nosql.exec(F.error());
		callback(SUCCESS(true));
	});

	schema.addWorkflow('email', function(error, model, options, callback) {
		// @TODO: send email
		callback();
	});

});