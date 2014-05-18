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
		boostrap: '../js/boostrap',
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

require( ['app'] );
