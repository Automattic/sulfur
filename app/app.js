var app = app || {};

// Init the router.
new app.Router();

// Get the user
var getCurrentUser = app.getCurrentUser();

$.when( getCurrentUser ).done( function() {
	Backbone.history.start();
} );