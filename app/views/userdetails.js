var app = app || {};

app.userdetailsView = Backbone.View.extend( {
	id: 'userdetails',
	model: app.userModel,
	template: _.template( $( '#user-template' ).html() ),

	initialize: function() {
		this.model.fetch();

		this.listenTo( this.model, 'reset', _.bind( this.render, this ) );
	},

	render: function() {
		this.$el.html(
			this.template( this.model.attributes )
		).attr( 'id', this.id );

		return this;
	}
} );