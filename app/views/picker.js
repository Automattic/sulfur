var app = app || {};

app.pickerView = Backbone.View.extend( {
	tagName: 'a',
	id: 'pickfiles',

	render: function() {
		this.$el.attr( 'id', this.id )
				.attr( 'href', '' )
				.html( '[Select files]' );

		return this;
	}
} );