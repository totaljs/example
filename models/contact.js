NEWSCHEMA('Contact').make(function(schema) {

	schema.define('id', 'String(10)');
	schema.define('iduser', 'String(10)');
	schema.define('name', 'String(30)');
	schema.define('email', 'String(200)', true);
	schema.define('body', String, true);

	schema.setSave(function(error, model, controller, callback) {
		var builder = new MongoBuilder();
		builder.set(model);
		builder.set('created', new Date());
		builder.set('ip', controller.ip);
		builder.insert(DB('contact'), F.error());
		callback(SUCCESS(true));
	});

	schema.addWorkflow('email', function(error, model, options, callback) {
		// @TODO: send email
		callback();
	});

});