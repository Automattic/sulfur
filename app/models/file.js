define([
	'jquery',
	'underscore',
	'backbone',
	'moment'
], function( $, _, Backbone, moment ) {
	app.fileModel = Backbone.Model.extend( {
		defaults: {
			pending: false
		},

		url: function () {
			return 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/' + this.get( 'id' );
		},

		getPreview: function() {
			var type = this.getType();
			var src = '';

			if ( 'image' == type ) {
				src = this.get( 'link' );
				if ( ! this.get( 'pending' ) )
					src = src + '?w=300&h=300&resize=300,300';
			} else if ( 'video' == type ) {
				var metadata = this.get('metadata');
				src = this.get( 'link' ).substring( 0, this.get( 'link' ).lastIndexOf( '/' ) ) + '/' + metadata.thumb;
			} else if ( 'audio' == type ) {
				src = '/images/place-audio.png';
			} else if ( 'document' == type ) {
				src = '/images/place-doc.png';
			} else {
				src = '/images/place-other.png';
			}

			return src;
		},

		// the api doesn't currently return type - we should add that later so we don't need to do logic here to figure it out
		// not perfect, but works for now
		getType: function() {
			var ext = this.get( 'link' ).split('.').pop();
			if ( ext in { 'jpg':'', 'jpeg':'', 'gif':'', 'png':'' } )
				return 'image';
			else if ( ext in { 'mov':'','ogv':'', 'mp4':'', 'm4v':'', 'wmv':'', 'avi':'', 'mpg':'', '3gp':'', '3g2':'' } )
				return 'video';
			else if ( ext in { 'mp3':'', 'm4a':'', 'wav':'', 'ogg':'' } )
				return 'audio';
			else if ( ext in { 'doc':'', 'docx': '', 'pdf': '', 'ppt':'', 'odt':'', 'pptx':'', 'pps':'', 'ppsx':'', 'xls':'', 'xlsx':'', 'key':'' } )
				return 'document';
			else if ( ext.slice( 0, 10 ) == 'data:image' ) {
				return 'image';
			}
			else
				return 'other';
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
			if ( response.metadata.image_meta ) {
				response.metadata.image_meta.shutter_speed = response.metadata.image_meta.shutter_speed ? this.formatShutterSpeed( response.metadata.image_meta.shutter_speed ) : response.metadata.image_meta.shutter_speed;
				response.metadata.image_meta.aperture = response.metadata.image_meta.aperture ? 'f/' + response.metadata.image_meta.aperture : response.metadata.image_meta.aperture;
				response.metadata.image_meta.focal_length = response.metadata.image_meta.focal_length ? response.metadata.image_meta.focal_length + ' mm' : response.metadata.image_meta.focal_length;
			}
			response.date = moment( response.date ).format( 'LLLL' );
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
