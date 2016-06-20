exports.install = function() {
	F.localize('/templates/*.html', ['compress']);

	// Common
	F.route('/');         // --> is routed into the /themes/CURRENT_THEME/views/index.html
	F.route('/contact/'); // --> is routed into the /themes/CURRENT_THEME/views/contact.html

	// User's account
	F.route('/account/', 'account-unauthorized', ['unauthorize']); // --> is routed into the /themes/CURRENT_THEME/views/account-unauthorize.html
	F.route('/account/', 'account-authorized',   ['authorize']);   // --> is routed into the /themes/CURRENT_THEME/views/account-authorize.html
	F.route('/account/logoff/', redirect_logoff, ['authorize']);   // Removes user session
};

function redirect_logoff() {
	var self = this;
	self.user = null;
	// user's sessions will removed automatically
	self.cookie('user', '', '-5 days');
	self.redirect('/account/');
}