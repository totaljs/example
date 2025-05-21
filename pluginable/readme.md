# Pluginable app

This folder contains an example of a Total.js application created using plugins. We added two simple plugins, `Todo` and `Files`, that have the same features as the API app. This app is nothing special. It only offers much cleaner app logic for development.

## How to run it?

- Install [Node.js platform](https://nodejs.org/en/download)
- Install PostgreSQL database
- Install NPM dependencies:
	- `$ cd Pluginable`
	- `$ npm install`
- Change the database connection string in the `/config` file
- Run the app `$ npm start` or `$ node index.js`

## How to test it?

Check the file `/test.js`. It includes API requests to this Total.js API service. You can run test via `$ npm test` or `node test.js`.

## What does the payload look like?

__Example__:

```
POST http://127.0.0.1:8000/api/
X-Token: 6mHceMs4iKr8
Content-Type: application/json

{
	"schema": "Action|name?arg1=value&arg2=value&argN=value",
	"data": {
		"key1": ...,
		"keyN": ...
	}
}
```

### Examples of the Todo API

__Create__:

```
POST http://127.0.0.1:8000/api/
X-Token: 6mHceMs4iKr8
Content-Type: application/json

{
	"schema": "Todo|create",
	"data": {
		"name": "Fist task",
		"body": "Task body"
	}
}
```

__Listing__:

```
POST http://127.0.0.1:8000/api/
X-Token: 6mHceMs4iKr8
Content-Type: application/json

{
	"schema": "Todo|list"
}
```

__Update__:

```
POST http://127.0.0.1:8000/api/
X-Token: 6mHceMs4iKr8
Content-Type: application/json

{
	"schema": "Todo|update",
	"data": {
		"id": "123456789"
		"name": "Fist task",
		"body": "Task body",
		"iscompleted": true
	}
}
```