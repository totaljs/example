exports.install = function() {
	// Merging scripts
	F.merge('/default/js/default.js', '/js/jctajr.min.js', '/js/common.js', '/js/ui.js', '=default/public/js/default.js');

	// Merging styles
	F.merge('/default/css/default.css', '/css/bootstrap.min.css', '/css/common.css', '=default/public/css/ui.css', '=default/public/css/default.css');
};