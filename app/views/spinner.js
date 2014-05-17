var app = app || {};

app.spinnerView = Backbone.View.extend( {
	className: 'spinner',

	render: function() {
		this.$el.attr( 'class', this.className );
		return this;
	}
} );