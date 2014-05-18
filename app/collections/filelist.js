define([
	'jquery',
	'underscore',
	'backbone',
	'models/file'
], function( $, _, Backbone ) {
	app.filelistCollection = Backbone.Collection.extend( {
		model: app.fileModel,

		url: function () {
			return 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/';
		},

		initialize: function () {
			this.fetch( { remove: false } ).done( _.bind( function() {
				this.trigger( 'fetched' );
			}, this ) );
		},

		parse: function ( response ) {
			return response.media;
		}
	} );

	return app.filelistCollection;
});