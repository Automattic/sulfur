var app = app || {};

app.fileModel = Backbone.Model.extend( {
	url :  function() {
		return 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/' + this.get( 'id' );
	}
} );