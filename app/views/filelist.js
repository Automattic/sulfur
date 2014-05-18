define([
	'jquery',
	'underscore',
	'backbone',
	'collections/filelist'
], function( $, _, Backbone ) {
	app.filelistView = Backbone.View.extend( {
		id: 'filegrid',

		events: {
			'click .more': 'loadMore'
		},

		initialize: function () {
			this.$el.attr( 'id', this.id );

			this.setLoading();
			this.collection = new app.filelistCollection();

			// Listen for new files
			this.listenTo( this.collection, 'add', _.bind( this.addFile, this ) );
			this.on( 'destroyedModel', this.removeFile, this );

			// Check for files status when fetch is done
			this.listenTo( this.collection, 'fetched', _.bind( this.checkFiles, this ) );
		},

		render: function () {
			$( '#pickfiles' ).show();

			return this;
		},

		addFile: function( file ) {
			if ( file.get( 'pending' ) == true ) {
				this.prependFile( file );
			} else {
				this.appendFile( file );
			}
		},

		removeFile: function( file ) {
			$( '#file-' + file.get( 'id' ) ).remove();
		},

		appendFile: function ( file ) {
			var output = this.renderFile( file );

			this.$el.append( output );
		},

		prependFile: function ( file ) {
			var output = this.renderFile( file );

			this.$el.find( 'img:first' ).before( output );
		},

		renderFile: function ( file ) {
			var fileView = new app.fileView( { model: file } );

			return fileView.render().el;
		},

		loadMore: function() {
			this.$el.find( '.more' ).remove();

			var data = {};
			data.offset = this.$el.find( "img" ).length;
			var self = this;

			this.collection.fetch( {
				data: data,
				add: true,
				success: _.bind( function() {

					if ( self.collection.found > self.$el.find( "img" ).length ) {
						this.$el.append( '<button type="button" class="btn btn-default btn-lg more">View More</button>' );
					}

					$( 'html, body' ).animate( {
						scrollTop: $( 'img:last' ).offset().top
					}, 500 );
				}, this )
			} );
		},

		checkFiles: function() {
			this.$el.find( 'p' ).remove();

			if( 0 === this.collection.found ) {
				this.setEmpty();
			} else if ( this.collection.found > 20 ) {
				this.$el.append( '<button type="button" class="btn btn-default btn-lg more">View More</button>' );
			}
		},

		setLoading: function () {
			this.$el.html( '<p>Loading your media library...</p>' );
		},

		setEmpty: function() {
			this.$el.html( '<p>No files found! Upload something :)</p>' );
		}
	} );

	return app.filelistView;
});