var app = app || {};

app.filelistView = Backbone.View.extend({
	id: 'filegrid',

	render: function( models ) {
		this.$el.attr( 'id', this.id );
		$.each( models, _.bind( function( i, file ) {
			var fileView = new app.fileView({ model: file });
			var output = fileView.render();
			this.$el.append( output.el );
		}, this ) );

		$( '#main' ).append( this.$el );

		return this;
	}
});