// PostgreSQL initialization
// The "CONF.database" key contains the connection string from the /config file.
require('querybuilderpg').init('default', CONF.database, ERROR('PostgreSQL'));

ON('ready', async function() {

	// Check if the database exists.
	let tables = await DATA.query("SELECT FROM pg_tables WHERE schemaname='public' AND tablename='tbl_todo' LIMIT 1").promise();
	if (tables.length)
		return;

	// If not, we'll create it.
	let sql = await Total.readfile(PATH.root('database.sql'), 'utf8')
	await DATA.query(sql).promise();

});