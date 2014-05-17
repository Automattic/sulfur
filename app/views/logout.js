var app = app || {};

app.authorizationView = Backbone.View.extend( {
	id: 'logout',
	template: _.template( $( '#logout-template' ).html() ),

	render: function() {
		this.$el.html(
			this.template()
		);

		$( '#main' ).append( this.el )

		return this;
	}
} );