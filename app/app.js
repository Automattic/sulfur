var app = app || {};

// Init the router.
app.routerInstance = new app.Router();

// Get the user
app.getCurrentUser( function() {
	// Start routing once we have a current user
	Backbone.history.start();
} );