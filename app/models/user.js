define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.userModel = Backbone.Model.extend( {
		url: 'https://public-api.wordpress.com/rest/v1/me/',
	} );

	return app.userModel;
} );