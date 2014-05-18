define([
	'jquery',
	'underscore',
	'backbone',
	'collections/filelist'
], function( $, _, Backbone ) {
	app.filelistView = Backbone.View.extend( {
		id: 'filegrid',
		isLoadingMore: false,

		events: {
			'click .more': 'loadMore'
		},

		initialize: function () {
			this.$el.attr( 'id', this.id );

			this.setLoading();
			this.collection = new app.filelistCollection();

			// Listen for new files
			this.listenTo( this.collection, 'add', _.bind( this.addFile, this ) );
		},

		setLoading: function () {
			this.$el.html( '<p>Loading your media library...</p>' );
		},

		setEmpty: function() {
			this.$el.html( '<p>No files found! Upload something :)</p>' );
		},

		render: function () {
			$( '#pickfiles' ).show();

			return this;
		},

		addFile: function( file ) {
			this.$el.find( 'p' ).remove();

			if ( file.get( 'pending' ) == true ) {
				this.prependFile( file );
			} else {
				this.appendFile( file );
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

		renderFile: function ( file ) {
			var fileView = new app.fileView( { model: file } );

			return fileView.render().el;
		},

		loadMore: function() {
			this.$el.find( '.more' ).remove();

			var data = {};
			data.offset = this.$el.find( "img" ).length;

			this.collection.fetch( {
				data: data,
				add: true,
				success: _.bind( function() {
					this.$el.append( '<button type="button" class="btn btn-default btn-md more">View More</button>' );
				}, this )
			} );
		}
	} );

	return app.filelistView;
});