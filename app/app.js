var app = app || {};

// Config details
app.config = {
	oAuth: {
		clientID: 35140,
		redirectURL: 'http://sulfur.dev'
	}
};

// Token and site id
app.auth = {
	accessToken: localStorage.getItem( 'access_token' ),
	siteID: localStorage.getItem( 'site_id' )
}

// Init the router.
app.router = new app.Router();
if ( location.pathname.indexOf( 'access_token' ) > -1 ) {
	Backbone.history.start();
} else {
	Backbone.history.start({pushState: true});
}

// Redirect to authorize route if there's no auth details
if ( _.isNull( app.auth.accessToken ) || _.isNull( app.auth.siteID ) ) {
	app.router.navigate( 'authorize', { trigger: true, replace: true } );
}