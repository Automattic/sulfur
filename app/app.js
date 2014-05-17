var app = app || {};

// Init the router.
app.routerInstance = new app.Router();
Backbone.history.start();

// Redirect to authorize route if there's no auth details
if ( _.isNull( app.auth.accessToken ) || _.isNull( app.auth.siteID ) ) {
	location.hash = 'authorize';
}