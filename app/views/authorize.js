var app = app || {};

app.authorizeView = Backbone.View.extend({
	id: 'authorize',
	template: _.template( $( '#authorize-template' ).html() ),

	events: {

	},

	initialize: function() {

	},

	render: function() {
		this.$el.html(
			this.template()
		);

		$( '#main' ).html( this.el )

		return this;
	}
});