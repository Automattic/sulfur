define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.fileModel = Backbone.Model.extend( {
		url: function () {
			return 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/' + this.get( 'id' );
		},

		destroyUrl: function () {
			return this.url() + '/delete';
		},

		destroy: function ( options ) {
			var opts = _.extend(
				{
					url   : this.destroyUrl(),
					method: 'POST'
				}, options || {} );

			return Backbone.Model.prototype.destroy.call( this, opts );
		}
	} );

	return app.fileModel;
});