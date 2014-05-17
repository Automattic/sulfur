var app = app || {};

app.fileView = Backbone.View.extend({
	model: app.fileModel,
	template: _.template( $( '#file-template' ).html() ),

	render: function() {
		this.$el.html(
			this.template( this.model.attributes )
		);

		$( '#main' ).append( this.el );

		return this;
	}
});