var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		'': 						'home',
		'authorize': 				'authorize',
		'access_token=*fragment':	'getAuthFragment',
	},

	home: function() {
		var helloView = new app.helloView();
		helloView.render();
	},

	authorize: function() {
		var authorizationView = new app.authorizationView();
		authorizationView.render();
	},

	getAuthFragment: function() {
		var	response = _.object(
			_.compact(
				_.map( location.hash.slice( 1 ).split( '&' ), function( item ) {
					if ( item ) {
						return item.split( '=' );
					}
				} )
			)
		);

		localStorage.setItem( 'access_token', decodeURIComponent( response.access_token ) );
		localStorage.setItem( 'site_id', response.site_id );

		this.navigate( '', { trigger: true } );
	}
});