var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		'': 						'home',
		'authorize': 				'authorize',
		'logout': 					'logout',
		'access_token=*fragment':	'getAuthFragment',
	},

	home: function() {
		// Render whatever will be on the home page.
	},

	authorize: function() {
		var authorizationView = new app.authorizationView();
		authorizationView.render();
	},

	logout: function() {
		app.auth = {};
		localStorage.removeItem( 'access_token' );
		localStorage.removeItem( 'site_id' );

		location.hash = 'authorize';
	},

	getAuthFragment: function() {
		// Extract the auth details from the # fragment returned by the API
		var	response = _.object(
			_.compact(
				_.map( location.hash.slice( 1 ).split( '&' ), function( item ) {
					if ( item ) {
						return item.split( '=' );
					}
				} )
			)
		);

		app.auth = {
			accessToken: decodeURIComponent( response.access_token ),
			siteID: response.site_id
		}

		localStorage.setItem( 'access_token', app.auth.accessToken );
		localStorage.setItem( 'site_id', app.auth.siteID );

		location.hash = '';
	}
});