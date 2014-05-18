define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'models/file'
], function( $, _, Backbone ) {
	app.singleView = Backbone.View.extend( {
		model 	: app.fileModel,
		template: _.template( $( '#single-template' ).html() ),

		render: function() {
			var that = this;

			this.$el.html(
				this.template( this.model.attributes )
			);

			this.$el.find( '.modal' ).modal( 'show' );

			this.$el.find( '.btn-danger' ).click( function() {
				if ( confirm( 'Are you sure you want to delete this image?' ) ) {
					that.$el.find( '.modal' ).modal( 'hide' );
					that.model.destroy( {
						success: function( model, response ) {
							app.router.navigate( '', { trigger: true } );
						}
					} );
				}
				return false;
			} );

			return this;
		}
	} );

	return app.singleView;
} );
