// This endpoint returns a list of all available plugins.
ROUTE('GET /plugins/', function($) {

	let plugins = [];

	for (let key in Total.plugins) {

		let plugin = Total.plugins[key];

		if (plugin.hidden)
			continue;

		if (plugin.visible && !plugin.visible($.user || EMPTYOBJECT))
			continue;

		let item = {};

		item.id = plugin.id;
		item.name = plugin.name;
		item.permissions = plugin.permissions;
		item.icon = plugin.icon;

		plugins.push(item);

	}

	$.json(plugins);
});