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
			var site = this.model.get( 'meta' ).data.site;
			var data = this.model.attributes;
			data.blog = site.URL;

			this.$el.html(
				this.template( data )
			).attr( 'id', this.id );

			return this;
		}
	} );

	return app.userdetailsView;
} );