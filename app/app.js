var app = app || {};

require([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function( $, _, Backbone, Router ) {
	// Pass the auth details when we do a request.
	$.ajaxSetup({
		beforeSend: function( xhr ) {
			if ( 'undefined' != typeof( app.auth.accessToken ) )
				xhr.setRequestHeader( 'Authorization', 'BEARER ' + app.auth.accessToken );
		}
	});

	// Init the router.
	app.router = new app.Router();
	Backbone.history.start();

	// Redirect to authorize route if there's no auth details
	if ( _.isNull( app.auth.accessToken ) || _.isNull( app.auth.siteID ) ) {
		app.router.navigate( 'authorize', { trigger: true, replace: true } );
	}

	return app;
});