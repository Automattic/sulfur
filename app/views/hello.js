var app = app || {};

app.helloView = Backbone.View.extend({
	id: 'hello',
	template: _.template( $( '#hello-template' ).html() ),

	initialize: function() {
		this.listenTo( app.currentUser, 'change', this.render );
		this.render();
	},

	render: function() {
		this.$el.html(
			this.template( app.currentUser.attributes )
		);

		$( '#main' ).append( this.el )

		return this;
	}
});