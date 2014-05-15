var app = app || {};

app.getCurrentUser = function() {
	if ( _.isNull( localStorage.getItem( 'access_token' ) ) )
		return false;

	app.currentUser = new app.userModel();

	return app.currentUser.fetch( {
		beforeSend: app.sendAuth
	} );
};

app.sendAuth = function( xhr ) {
	xhr.setRequestHeader( 'Authorization',  'BEARER ' + localStorage.getItem( 'access_token' ) );
};
