define([
	'jquery',
	'underscore',
	'backbone',
	'models/user'
], function( $, _, Backbone ) {
	app.userdetailsView = Backbone.View.extend( {
		id 		: 'userdetails',
		template: _.template( $( '#user-template' ).html() ),

		render: function() {
			this.$el.html(
				this.template( this.model.attributes )
			).attr( 'id', this.id );

			return this;
		}
	} );

	return app.userdetailsView;
} );