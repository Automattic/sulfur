var app = app || {};

app.pickerView = Backbone.View.extend( {
	id: 'picker',
	template: _.template( $( '#picker-template' ).html() ),

	render: function() {
		this.$el.attr( 'id', this.id )
				.html(
					this.template()
				);

		return this;
	}
} );