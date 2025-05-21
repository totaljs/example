// This file contains the actions that Todo performs when listing, creating, updating, or removing tasks.
// Run the /test.js file for API requests to the following actions.

NEWACTION('Todo|create', {
	name: 'Create task',
	input: '*name:String, *body:String',
	route: '+API ?',

	// route: '+API ?', // "+" means that user must be authorized
	// route: '-API ?', // "-" means that user must be unauthorized
	// route: 'API ?',  // it doesn't matter if the user is authorized or unauthorized

	// Would you rather not use the Total.js API endpoints? It's easy to change the routes list this:
	// route: '+POST ?/tasks/create/',

	action: async function($, model) {

		// $ {Options} Documentation: https://docs.totaljs.com/total5/IbGpBV25x60f/
		// $.query
		// $.user
		// $.params
		// $.model
		// $.headers

		// It creates a unique identifier.
		model.id = UID();
		model.dtcreated = new Date();
		model.createdby = $.user ? $.user.name : null;

		// Insert the data into the database.
		await DATA.insert('tbl_todo', model).promise($);

		// Return the task ID.
		$.success(model.id);
	}
});

NEWACTION('Todo|list', {
	name: 'List of tasks',
	route: '+API ?',
	action: async function($, model) {

		// It creates a list with pagination and filtering and sorting of the fields defined in the .autoquery() method.
		let response = await DATA.list('tbl_todo').autoquery($.query, 'id:String, name:String, body:String, iscompleted:Boolean, createdby:String, updatedby:String, completedby:String, dtcompleted:Date, dtcreated:Date, dtupdated:Date', 'dtcreated_desc', 100).promise($);
		$.callback(response);

	}
});

NEWACTION('Todo|read', {
	name: 'Read a specific task',
	input: '*id:UID',
	route: '+API ?',
	action: async function($, model) {

		// It reads the data from the database. If the row doesn't exist, a 404 error is automatically returned.
		let response = await DATA.read('tbl_todo').id(model.id).error(404).promise($);
		$.callback(response);

	}
});

NEWACTION('Todo|update', {
	name: 'Update task',
	input: '*id:UID, *name:String, *body:String, iscompleted:Boolean',
	route: '+API ?',
	action: async function($, model) {

		if (model.iscompleted)
			model.completedby = $.user ? $.user.name : null;

		model.dtupdated = new Date();
		model.updatedby = $.user ? $.user.name : null;

		// It updates the data in the database. If the row doesn't exist, a 404 error is automatically returned.
		await DATA.modify('tbl_todo', model).id(model.id).error(404).promise($);

		// Return the task ID.
		$.success(model.id);
	}
});

NEWACTION('Todo|remove', {
	name: 'Remove task',
	input: '*id:UID',
	route: '+API ?',
	permissions: 'admin',
	action: async function($, model) {

		// It deletes data from the database. If the row doesn't exist, a 404 error is automatically returned.
		await DATA.remove('tbl_todo').id(model.id).error(404).promise($);

		// Return the task ID.
		$.success(model.id);
	}
});

NEWACTION('Todo|clear', {
	name: 'Remove all tasks',
	route: '+API ?',
	permissions: 'admin',
	action: async function($, model) {

		// It deletes all data from the database.
		await DATA.remove('tbl_todo').promise($);

		$.success();
	}
});