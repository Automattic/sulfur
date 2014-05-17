var app = app || {};

app.filelistCollection = Backbone.Collection.extend( {
	model: app.fileModel,

	url: function() {
		return 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/';
	},

	initialize: function() {
		this.fetch( { reset: true } );
	},

	parse: function( response ) {
		return response.media;
	}
} );