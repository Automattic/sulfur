define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.singleView = Backbone.View.extend( {
		model 	: app.fileModel,
		template: _.template( $( '#single-template' ).html() ),

		render: function() {
			var that = this;

			var data = this.model.attributes;
			data.preview = this.model.getPreview();

			this.$el.html(
				this.template( data )
			);

			this.$el.find( '.single-image-actions .single-image-delete' ).click( function() {
				if ( confirm( 'Are you sure you want to delete this image?' ) ) {
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