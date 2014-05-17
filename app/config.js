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

// Pass the auth details when we do a request.
$.ajaxSetup({
	beforeSend: function( xhr ) {
		xhr.setRequestHeader( 'Authorization', 'BEARER ' + app.auth.accessToken );
	}
});