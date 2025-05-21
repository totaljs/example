# Total.js API example (TODO)

This folder contains an example of a simple Total.js API service (called `Todo`) with actions and token authorization. The API service uses Total.js API endpoint routing. It contains only one endpoint `/api/`, which is defined in the `/config` file. You can change it whenever you want.

## How to run it?

- Install [Node.js platform](https://nodejs.org/en/download)
- Install PostgreSQL database
- Install NPM dependencies:
	- `$ cd api`
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