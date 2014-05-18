define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.pickerView = Backbone.View.extend( {
		id      : 'picker',
		template: _.template( $( '#picker-template' ).html() ),

		render: function () {
			this.$el.attr( 'id', this.id )
				.html(
				this.template()
			);

			return this;
		}
	} );

	return app.pickerView;
});