exports.name = 'Files';
exports.icon = 'ti ti-files';
exports.visible = user => true;
exports.hidden = false;
exports.permissions = [{ id: 'files_upload', name: 'Upload files' }, { id: 'files_remove', name: 'Removing files' }];

exports.install = function() {

	// Custom (special) defined routes
	ROUTE('FILE /download/*.*', download);

};

function download($) {

	var id = $.split[1];
	var opt = {};

	id = id.substring(0, id.lastIndexOf('.'));

	opt.id = id;
	opt.download = $.query.download == '1';

	FILESTORAGE('files').http($, opt);
}

NEWACTION('Files|upload', {
	name: 'Upload files',
	route: '+POST /upload/ <10MB',
	permissions: 'files_upload',
	action: async function($, model) {

		let response = [];

		// Store uploaded files in the Total.js FileStorage ("/databases/fs-files" folder)
		for (let file of $.files) {
			let fs = await file.fs('files', UID());
			fs.url = '/download/{id}.{ext}'.args(fs);
			response.push(fs);
		}

		$.callback(response);
	}
});

NEWACTION('Files|remove', {
	name: 'Remove file',
	route: '+API ?',
	input: '*id:UID',
	permissions: 'files_remove',
	action: function($, model) {
		FILESTORAGE('files').remove(model.id, function(err) {
			if (err)
				$.invalid(404);
			else
				$.success(model.id);
		});
	}
});
