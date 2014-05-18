define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.logoutView = Backbone.View.extend( {
		id      : 'logout',
		template: _.template( $( '#logout-template' ).html() ),

		render: function () {
			this.$el.html(
				this.template()
			);

			return this;
		}
	} );

	return app.logoutView;
});