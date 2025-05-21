// This script makes multiple requests to the Todo API in a row.
// Run the script by entering "node test.js" or "npm test" into the command line.

require('total5');

// API endpoint
const API = 'http://127.0.0.1:8000/api/';

// The token must match what is specified in the "/config" file.
const TOKEN = '6mHceMs4iKr8';

async function list(query) {
	return await RESTBuilder.POST(API, { schema: 'Todo|list' + (query ? ('?' + query) : '') }).header('x-token', TOKEN).promise();
}

async function read(id) {
	let data = {};
	data.id = id;
	return await RESTBuilder.POST(API, { schema: 'Todo|read', data: data }).header('x-token', TOKEN).promise();
}

async function create(name, body) {
	let data = {};
	data.name = name;
	data.body = body;
	return await RESTBuilder.POST(API, { schema: 'Todo|create', data: data }).header('x-token', TOKEN).promise();
}

async function update(id, name, body, iscompleted) {
	let data = {};
	data.id = id;
	data.name = name;
	data.body = body;
	data.iscompleted = iscompleted;
	return await RESTBuilder.POST(API, { schema: 'Todo|update', data: data }).header('x-token', TOKEN).promise();
}

async function remove(id) {
	let data = {};
	data.id = id;
	return await RESTBuilder.POST(API, { schema: 'Todo|remove', data: data }).header('x-token', TOKEN).promise();
}

async function clear() {
	return await RESTBuilder.POST(API, { schema: 'Todo|clear' }).header('x-token', TOKEN).promise();
}

async function upload(filename) {
	return await RESTBuilder.POST(API.replace(/api/, 'upload')).file('file', filename).header('x-token', TOKEN).promise();
}

(function() {

	let arr = [];

	// This is a temporary variable for the created task ID.
	let id;

	// Create
	arr.push(async function(next) {
		let created = await create('First task', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, corporis.');
		id = created.value;
		console.log('Created:', created);
		setTimeout(next, 1000);
	});

	// List
	arr.push(async function(next) {
		let items = await list('iscompleted=false');
		console.log('List (1):', items);
		setTimeout(next, 1000);
	});

	// Update
	arr.push(async function(next) {
		let updated = await update(id, 'First task (updated)', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, corporis.', true);
		console.log('Updated:', updated);
		setTimeout(next, 1000);
	});

	// List
	arr.push(async function(next) {
		let items = await list('body=Lorem&iscompleted=false');
		console.log('List (2):', items);
		setTimeout(next, 1000);
	});

	// Read
	arr.push(async function(next) {
		let task = await read(id);
		console.log('Read:', task);
		setTimeout(next, 1000);
	});

	// Remove
	arr.push(async function(next) {
		let removed = await remove(id);
		console.log('Removed:', removed);
		setTimeout(next, 1000);
	});

	// Upload file
	arr.push(async function(next) {
		let uploaded = await upload('readme.md');
		console.log('Uploaded:', uploaded);
		setTimeout(next, 1000);
	});

	// Clear
	/*
	arr.push(async function(next) {
		await clear();
		console.log('Clear');
		setTimeout(next, 1000);
	});
	*/

	arr.async(() => console.log('DONE'));

})();