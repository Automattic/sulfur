var app = app || {};

app.filelistView = Backbone.View.extend({
	id: 'filegrid',

	initialize: function() {
    	var self = this;

    	this.collection = new app.filelistCollection();
    	this.collection.fetch().done( function(){
      		self.render();
    	} );
	},

	render: function() {
		this.$el.attr( 'id', this.id );

		$.each( this.collection.models, _.bind( function( i, file ) {
			this.$el.append( this.renderFile( file ) );
		}, this ) );

		$( '#main' ).append( this.$el );

		return this;
	},

	renderFile: function( file ) {
		var fileView = new app.fileView( { model: file } );

		return fileView.render().el;
	}
});