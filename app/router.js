var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		'': 					'authorize',
		'authorize': 			'authorize',
	},

	authorize: function() {
		var authorizeView = new app.authorizeView();
		authorizeView.render();
	}
});