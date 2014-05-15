var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		'': 					'authorize',
		'authorize': 			'authorize',
	},

	authorize: function() {
		var authorizationView = new app.authorizationView();
		authorizationView.render();
	}
});