define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.userModel = Backbone.Model.extend( {
		url: 'https://public-api.wordpress.com/rest/v1/me/?meta=site',
	} );

	return app.userModel;
} );