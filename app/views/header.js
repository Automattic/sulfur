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
			this.userdetailsView = new app.userdetailsView( {
				model: new app.userModel()
			} );

			this.$el.append( this.userdetailsView.render().el );

			return this;
		},

		remove: function(){
			this.userdetailsView.remove();

			Backbone.View.prototype.remove.apply( this, arguments );
		}
	} );
} );