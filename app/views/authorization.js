var app = app || {};

app.authorizationView = Backbone.View.extend( {
	id: 'authorize',
	template: _.template( $( '#authorize-template' ).html() ),

	render: function() {
		this.$el.html(
			this.template()
		);

		return this;
	}
} );
