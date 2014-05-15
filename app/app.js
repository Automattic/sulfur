var app = app || {};

// Init the router.
new app.Router();

$( document ).on( 'ready', function() {
	// Start routing
	Backbone.history.start();

	// TODO: Move this to the router: access_token*
	app.getToken();
} );

app.getToken = function() {
	// Fragment parsing from http://timetler.com/2013/11/14/location-search-split-one-liner/
	var response = _.object(
		_.compact(
			_.map( location.hash.slice( 1 ).split( '&' ), function( item ) {
				if ( item ) {
					return item.split( '=' );
				}
			} )
		)
	);

	if ( _.isUndefined( response.access_token ) ) {
		return false;
	}

	var authModel = new app.authorizationModel( response );

	console.log( authModel );
}