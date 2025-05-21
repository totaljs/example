ROUTE('GET /', function($) {
	$.view('index', { name: 'Model name (Index)' });
});

ROUTE('GET /*', function($) {
	$.view('spa', { name: 'Model name (SPA)' });
});