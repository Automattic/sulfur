var app = app || {};

app.singleView = Backbone.View.extend({
	tagName: 'div',
	model: app.fileModel,
	template: _.template( $( '#single-template' ).html() ),

	render: function() {
		this.$el.html(
			this.template( this.model.attributes )
		);

		$( '#main' ).html( this.el );

		return this;
	}
});