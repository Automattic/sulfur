var app = app || {};

app.fileView = Backbone.View.extend({
	tagName: 'img',
	model: app.fileModel,

	render: function() {
		this.$el.attr( 'src', this.model.get( 'link' ) )
				.attr( 'width', '150' )
				.attr( 'height', '150' );

		return this;
	}
});