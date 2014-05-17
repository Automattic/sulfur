var app = app || {};

app.filelistView = Backbone.View.extend({
	id: 'filegrid',

	initialize: function() {
    	this.collection = new app.filelistCollection();

    	// Listen for new files
    	this.listenTo( this.collection, 'reset', _.bind( this.render, this ) );
    	this.listenTo( this.collection, 'add', this.prependFile );
	},

	render: function() {
		this.$el.attr( 'id', this.id );

		$.each( this.collection.models, _.bind( function( i, file ) {
			this.appendFile( file );
		}, this ) );

		$( '#main' ).append( this.$el );

		return this;
	},

	renderFile: function( file ) {
		var fileView = new app.fileView( { model: file } );

		return fileView.render().el;
	},

	appendFile: function( file ) {
		var output = this.renderFile( file );

		this.$el.append( output );
	},

	prependFile: function( file ) {
		var output = this.renderFile( file );

		this.$el.prepend( output );
	}
});