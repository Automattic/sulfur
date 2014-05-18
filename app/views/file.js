define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.fileView = Backbone.View.extend( {
		tagName: 'img',
		model  : app.fileModel,

		events: {
			'click' : 'loadSingleView'
		},

		render: function() {
			this.$el.attr( 'src', this.model.get( 'link' ) + '?resize=300,300' )
				.attr( 'id' , 'file-' + this.model.get( 'id' ) )
				.attr( 'width', '150' )
				.attr( 'height', '150' )
				.attr( 'data-id', this.model.cid );
			return this;
		},

		togglePending: function() {
			console.log("pending changed");
			this.$el.toggleClass( 'pending' );
		},

		loadSingleView: function() {
			app.router.navigate( 'view/' + this.model.get( 'id' ), { trigger: true } )
		}

	} );

	return app.fileView;
} );