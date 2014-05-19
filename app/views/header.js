define([
	'jquery',
	'underscore',
	'backbone',
	'views/userdetails',
	'models/user'
], function( $, _, Backbone ) {
	app.headerView = Backbone.View.extend( {
		id		: 'header',
		template: _.template( $( '#header-template' ).html() ),

		render: function() {
			this.$el.html(
				this.template()
			).attr( 'id', this.id );

			// Render user details view
			this.userModel = new app.userModel();
			this.userModel.fetch().done( _.bind( function() {
				this.userdetailsView = new app.userdetailsView( {
					model: this.userModel
				} );

				this.$el.find(".header-inner").append( this.userdetailsView.render().el );
			}, this ) );

			return this;
		},

		remove: function(){
			if ( ! _.isUndefined( this.userdetailsView ) ) {
				this.userdetailsView.remove();
			}

			Backbone.View.prototype.remove.apply( this, arguments );
		}
	} );

	return app.headerView;
} );