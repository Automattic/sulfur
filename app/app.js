var app = app || {};

// Init the router.
new app.Router();

$( document ).on( 'ready', function() {
	// Start routing
	Backbone.history.start();
} );