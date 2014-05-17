var app = app || {};

app.Router = Backbone.Router.extend({
	currentViews: [],

	routes: {
		'': 						'home',
		'authorize': 				'authorize',
		'logout': 					'logout',
		'view/:id':					'viewSingleItem',
		'access_token=*fragment':	'getAuthFragment'
	},

	home: function() {
		this.renderViews( [
			new app.logoutView(),
			new app.filelistView(),
			new app.pickerView()
		] );
	},

	authorize: function() {
		this.renderViews( [
			new app.authorizationView()
		] );
	},

	logout: function() {
		app.auth = {};
		localStorage.removeItem( 'access_token' );
		localStorage.removeItem( 'site_id' );

		this.navigate( 'authorize', { trigger: true, replace: true } );
	},

	viewSingleItem : function( id ) {
		var singleItem = new app.fileModel( { id: id } );

		singleItem.fetch().done( _.bind( function() {
			this.renderViews( [
				new app.singleView( { model: singleItem } )
			] );
		}, this ) );
	},

    renderViews: function ( views ) {
    	// Remove any current views
    	if ( this.currentViews.length ) {
    		$.each( this.currentViews, function( i, view ) {
    			view.remove();
    		} );
    	}

    	if ( ! views ) {
    		return false;
    	}

    	$.each( views, function( i, view ) {
    		var el = view.render().el;

			$( '#main' ).append( el );
    	} );

        this.currentViews = views;
        return this;
    },

	getAuthFragment: function() {
		// Extract the auth details from the # fragment returned by the API
		var response = _.object(
			_.compact(
				_.map( location.hash.slice( 1 ).split( '&' ), function ( item ) {
					if ( item ) {
						return item.split( '=' );
					}
				} )
			)
		);

		app.auth = {
			accessToken: decodeURIComponent( response.access_token ),
			siteID     : response.site_id
		};

		localStorage.setItem( 'access_token', app.auth.accessToken );
		localStorage.setItem( 'site_id', app.auth.siteID );

		this.navigate( '', {trigger: true} );
	}
});