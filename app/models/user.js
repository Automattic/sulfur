var app = app || {};

app.userModel = Backbone.Model.extend( {
	url: 'https://public-api.wordpress.com/rest/v1/me/',
} );