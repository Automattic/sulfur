var app = app || {};

app.getAccessToken = function() {
	var accessToken = localStorage.getItem( 'access_token' );

	if ( _.isNull( accessToken ) )
		return false;

	return accessToken;
};

app.getCurrentUser = function( callback ) {
	$.when( app.fetchCurrentUser() ).done( function() {
		if ( _.isUndefined( app.currentUser ) && _.isNull( location.hash.match( 'access_token' ) ) ) {
			location.hash = 'authorize';
		}

		if ( typeof callback == 'function' ) {
			callback.call( this );
		}
	} );
};

app.fetchCurrentUser = function() {
	var accessToken = app.getAccessToken();

	if ( ! accessToken ) {
		return false;
	}

	app.currentUser = new app.userModel();

	return app.currentUser.fetch( {
		beforeSend: app.sendAuth
	} );
};

app.sendAuth = function( xhr ) {
	xhr.setRequestHeader( 'Authorization',  'BEARER ' + localStorage.getItem( 'access_token' ) );
};