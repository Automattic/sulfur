define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.fileView = Backbone.View.extend( {
		id 	   : 'file',
		tagName: 'img',
		model  : app.fileModel,

		events: {
			'click' : 'loadSingleView'
		},

		initialize: function() {
			this.listenTo( this.model, 'change', _.bind( this.togglePending, this ) );
		},

		render: function() {
			this.$el.attr( 'src', this.model.getPreview() )
				.attr( 'id' , 'file-' + this.model.get( 'id' ) )
				.attr( 'width', '150' )
				.attr( 'height', '150' )
				.attr( 'class', this.model.getType() + '-type' )
				.attr( 'data-id', this.model.cid );
			if( this.model.get( 'pending' ) ) { this.$el.addClass('pending'); }
			return this;
		},

		togglePending: function() {
			console.log("SOMETHING changed", this.model.get('pending'));
			if( this.model.get( 'pending' ) ) {
				this.$el.addClass( 'pending' );
			} else {
				this.$el.removeClass( 'pending' );
			}
		},

		loadSingleView: function() {
			app.router.navigate( 'view/' + this.model.get( 'id' ), { trigger: true } )
		}

	} );

	return app.fileView;
} );