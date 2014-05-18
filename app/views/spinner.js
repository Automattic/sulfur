define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.spinnerView = Backbone.View.extend( {
		className: 'spinner',

		render: function () {
			this.$el.attr( 'class', this.className );
			return this;
		}
	} );

	return app.spinnerView;
});