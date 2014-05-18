define([
	'jquery',
	'underscore',
	'backbone',
	'collections/filelist'
], function( $, _, Backbone ) {
	app.filelistView = Backbone.View.extend( {
		id: 'filegrid',

		events: {
			'click .more': 'more'
		},

		initialize: function () {
			this.$el.attr( 'id', this.id );

			this.setLoading();
			this.collection = new app.filelistCollection();

			// Listen for new files
			this.listenTo( this.collection, 'reset', _.bind( this.render, this ) );
			this.listenTo( this.collection, 'add', _.bind( this.appendFile, this ) );
		},

		setLoading: function () {
			this.$el.html( 'Loading your media library...' );
		},

		render: function () {
			this.$el.html( '' );

			$.each( this.collection.models, _.bind( function ( i, file ) {
				this.appendFile( file );
			}, this ) );

			this.$el.append( '<a class="button more">More</a>' );

			$( '#pickfiles' ).show();

			return this;
		},

		renderFile: function ( file ) {
			var fileView = new app.fileView( { model: file } );

			return fileView.render().el;
		},

		appendFile: function ( file ) {
			var output = this.renderFile( file );

			this.$el.append( output );
		},

		prependFile: function ( file ) {
			var output = this.renderFile( file );

			this.$el.find( 'img:first' ).before( output );
		},

		more: function() {
			var $more = this.$( '.more' );
			$more.html( '' );
			var self = this;

			var data = {};
			data.offset = this.$el.find( "img" ).length;
	
			this.collection.fetch( { 
				data: data,
				add: true,
				success: function() {
					self.$el.append( '<a class="button more">More</a>' );
				}
			} );
		}

	} );

	return app.filelistView;
});