define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {
	app.fileModel = Backbone.Model.extend( {
		defaults: {
			pending: false
		},

		url: function () {
			return 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/' + this.get( 'id' );
		},

		getPreview: function() {
			var metadata = this.get('metadata');
			if ( 'undefined' == typeof metadata || 'undefined' == typeof metadata.thumb ) {
				var src = this.get( 'link' );
				if ( ! this.get( 'pending' ) )
					src = src + '?w=300&h=300&resize=300,300';
			} else {
				// we need a better way to just get the thumb URL
				var src = this.get( 'link' ).substring( 0, this.get( 'link' ).lastIndexOf( '/' ) ) + '/' + metadata.thumb;
			}
			return src;
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
