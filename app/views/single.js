define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'models/file'
], function( $, _, Backbone ) {
	app.singleView = Backbone.View.extend( {
		id		: 'single',
		model 	: app.fileModel,
		template: _.template( $( '#single-template' ).html() ),

		events: {
			'click .btn-danger': 'confirmDelete',
		},

		render: function() {
			var that = this;

			var data = this.model.attributes;
			data.preview = this.model.getPreview();

			this.$el.html(
				this.template( data )
			);

			this.$el.find( '.modal' )
				.modal( 'show' )
				.on( 'hidden.bs.modal', function() {
					app.router.navigate( 'm', { trigger: false } );
				} );

			return this;
		},

		confirmDelete: function() {
			if ( confirm( 'Are you sure you want to delete this image?' ) ) {
				this.$el.find( '.modal' ).modal( 'hide' );
				if ( app.filelistViewInstance )
					app.filelistViewInstance.trigger( 'destroyedModel', this.model );

				this.model.destroy( {
					success: function( model, response ) {
						app.router.navigate( '', { trigger: true } );
					}
				} );
			}

			return false;
		}
	} );

	return app.singleView;
} );
