define([
	'jquery',
	'underscore',
	'backbone',
	'models/file'
], function( $, _, Backbone ) {
	app.fileView = Backbone.View.extend( {
		tagName: 'img',
		model: app.fileModel,

		events: {
			'click' : 'loadSingleView'
		},

		render: function() {
			this.$el.attr( 'src', this.model.get( 'link' ) )
					.attr( 'width', '150' )
					.attr( 'height', '150' );

			return this;
		},

		loadSingleView: function() {
			app.router.navigate( 'view/' + this.model.get( 'id' ), { trigger: true } )
		}
	} );
} );