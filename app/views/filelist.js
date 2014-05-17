var app = app || {};

app.filelistView = Backbone.View.extend({
	id: 'filegrid',

	render: function() {
		this.$el.html(
			this.template()
		);

		$( '#main' ).html( this.el );

		return this;
	}
});