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
		},

		parse: function( response ) {
			response.metadata.image_meta.shutter_speed = response.metadata.image_meta.shutter_speed ? this.formatShutterSpeed( response.metadata.image_meta.shutter_speed ) : response.metadata.image_meta.shutter_speed;
			response.metadata.image_meta.aperture = response.metadata.image_meta.aperture ? 'f/' + response.metadata.image_meta.aperture : response.metadata.image_meta.aperture;
			response.metadata.image_meta.focal_length = response.metadata.image_meta.focal_length ? response.metadata.image_meta.focal_length + ' mm' : response.metadata.image_meta.focal_length;
			return response;
		},

		// props Jetpack
		formatShutterSpeed: function( d ) {
			if (d >= 1)
				return Math.round(d) + 's';
			var df = 1, top = 1, bot = 1;
			var limit = 1e5; //Increase for greater precision.
			while (df != d && limit-- > 0) {
				if (df < d) {
					top += 1;
				}
				else {
					bot += 1;
					top = parseInt(d * bot, 10);
				}
				df = top / bot;
			}
			if (top > 1) {
				bot = Math.round(bot / top);
				top = 1;
			}
			if (bot <= 1)
				return '1s';
			return top + '/' + bot + 's';
		}
	} );

	return app.fileModel;
});
