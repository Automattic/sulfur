define([
	'jquery',
	'underscore',
	'backbone',
	'collections/filelist'
], function( $, _, Backbone ) {
	app.filelistView = Backbone.View.extend( {
		id: 'filegrid',

		initialize: function () {
			this.$el.attr( 'id', this.id );

			this.setLoading();
			this.collection = new app.filelistCollection();

			// Listen for new files
			this.listenTo( this.collection, 'reset', _.bind( this.render, this ) );
			this.listenTo( this.collection, 'add', _.bind( this.prependFile, this ) );
		},

		setLoading: function () {
			this.$el.html( 'Loading your media library...' );
		},

		render: function () {
			this.$el.html( '' );

			$.each( this.collection.models, _.bind( function ( i, file ) {
				this.appendFile( file );
			}, this ) );

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
		}
	} );

	return app.filelistView;
});