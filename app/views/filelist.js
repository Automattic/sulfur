define([
	'jquery',
	'underscore',
	'backbone',
	'collections/filelist'
], function( $, _, Backbone ) {
	app.filelistView = Backbone.View.extend( {
		id: 'filegrid',
		isLoadingMore: false,
		hasRenderedOnce: false,

		events: {
			'click .more': 'more'
		},

		initialize: function () {
			this.$el.attr( 'id', this.id );

			this.setLoading();
			this.collection = new app.filelistCollection();

			// Listen for new files
			this.listenTo( this.collection, 'reset', _.bind( this.render, this ) );
			this.listenTo( this.collection, 'add', _.bind( this.addFile, this ) );
		},

		setLoading: function () {
			this.$el.html( 'Loading your media library...' );
		},

		setEmpty: function() {
			this.$el.html( 'No files found! Upload something :)' );
		},

		render: function () {
			if( ! this.hasRenderedOnce ) {
				this.hasRenderedOnce = true;
				return this;
			}

			this.$el.html( '' );

			$.each( this.collection.models, _.bind( function ( i, file ) {
				this.appendFile( file );
			}, this ) );

			if( 0 === this.collection.models.length ) {
				this.setEmpty();
			} else {
				this.$el.append( '<button type="button" class="btn btn-default btn-md more">View More</button>' );
			}

			$( '#pickfiles' ).show();

			return this;
		},

		renderFile: function ( file ) {
			var fileView = new app.fileView( { model: file } );

			return fileView.render().el;
		},

		addFile: function( file ) {
			if ( this.isLoadingMore ) {
				this.appendFile( file );
			} else {
				this.prependFile( file );
			}
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
			$more.remove();

			this.isLoadingMore = true;
			var self = this;

			var data = {};
			data.offset = this.$el.find( "img" ).length;
	
			this.collection.fetch( { 
				data: data,
				add: true,
				success: function() {
					self.$el.append( '<button type="button" class="btn btn-default btn-md more">View More</button>' );
					self.isLoadingMore = false;
				}
			} );
		}

	} );

	return app.filelistView;
});