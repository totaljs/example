exports.install = function() {
	F.route('/api/contact/',     json_contact, ['post', '*Contact']);          // Inserts contact form into the DB
	F.route('/api/account/',     json_account, ['post', '*User']);             // Inserts new account into the DB
	F.route('/api/login/',       json_login,   ['post', '*UserLogin']);          // Performs login
};

// Processes all contact forms
function json_contact() {
	var self = this;
	var async = self.body.$async(self.callback(), 1); // a callback with return (value) index
	async.$workflow('email'); // index: 0
	async.$save(self); // index: 1
}

// Processes all newsletter forms
function json_newsletter() {
	var self = this;
	var async = self.body.$async(self.callback(), 1); // a callback with return (value) index
	async.$workflow('check.email'); // index: 0
	async.$save(self); // index: 1
}

// Processes user forms
function json_account() {
	var self = this;
	var async = self.body.$async(self.callback(), 1); // a callback with return (value) index
	async.$workflow('check.email'); // index: 0
	async.$save(self); // index: 1
}

// Login
function json_login() {
	var self = this;
	self.body.$workflow('login', self, self.callback());
}