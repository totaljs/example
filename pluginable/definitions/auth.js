// Authorization delegates.
// You can define who has access to authorized or unauthorized routes.
// This delegate will execute for every request to each route and action, except for file routes.
AUTH(function($) {
	let token = $.headers['x-token'];
	if (token === CONF.token) {
		// "sa:true" OR "su:true" - it allows users to perform all actions with defined permissions without any restrictions.
		$.success({ id: 'admin', name: 'Admin', sa: true, permissions: ['admin'] });
	} else
		$.invalid();
});