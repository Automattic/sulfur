var app = app || {};

// Config details
app.config = {
	oAuth: {
		clientID: 35140,
		redirectURL: 'http://sulfur.dev'
	}
};

require.config({
	baseUrl: '/app/',
	paths: {
		jquery: '../js/jquery',
		underscore: '../js/underscore',
		backbone: '../js/backbone',
		bootstrap: '../js/bootstrap',
		plupload: '../js/plupload'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});


// Token and site id
app.auth = {
	accessToken: localStorage.getItem( 'access_token' ),
	siteID: localStorage.getItem( 'site_id' )
};

require( ['app'] );
