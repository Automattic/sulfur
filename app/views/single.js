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

			var data = this.model.attributes;
			data.preview = this.model.getPreview();

			this.$el.html(
				this.template( data )
			);

			this.$el.find( '.modal' ).modal( 'show' );

			// TODO -- this should all be on events: {}

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

			this.$el.find( '.modal' ).on( 'hidden.bs.modal', function() {
				app.router.navigate( '', { trigger: true } );
			});

			return this;
		}
	} );

	return app.singleView;
} );
