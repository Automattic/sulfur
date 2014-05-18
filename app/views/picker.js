define([
	'jquery',
	'underscore',
	'backbone',
	'models/file',
	'collections/filelist',
	'views/filelist',
	'plupload'
], function( $, _, Backbone ) {
	app.pickerView = Backbone.View.extend( {
		id      : 'picker',
		template: _.template( $( '#picker-template' ).html() ),

		render: function() {
			this.$el.attr( 'id', this.id )
				.html(
				this.template()
			);

			this.initUploader();
			return this;
		},

		initUploader: function() {
			var dropZone = $( '#the-body' )[0],
				button = this.$el.find( '#pickfiles' )[0],
				container = this.$el.find( '#file-container' )[0];

			this.uploader = new plupload.Uploader( {
				runtimes      : 'html5,html4',
				browse_button : button,
				container     : container,
				url           : 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/new',
				file_data_name: 'media[]',
				headers       : { Authorization: "Bearer " + app.auth.accessToken },
				drop_element  : dropZone,
				filters       : {
					max_file_size: '10mb',
					mime_types   : [
						{title: "Image files", extensions: "jpg,gif,png,jpeg"},
					]
				},

				init: {
					FilesAdded: function ( up, files ) {
						plupload.each( files, function ( file ) {
							var thumbnail = new mOxie.Image();
							thumbnail.onload = function () {
								thumbnail.downsize( 150, 150 );
								var newFile = new app.fileModel( {
									      'id': file.id,
									      'link': thumbnail.getAsDataURL()
								        } );
								newFile.set( { pending: true } );
								app.filelistViewInstance.collection.add( newFile );
							};

							// mOxie doesn't support anything other than jpg and png
							if( -1 != $.inArray( file.type, ['image/jpeg', 'image/jpg', 'image/png' ] ) ) {
								thumbnail.load( file.getSource() );
							} else {
								var newFile = new app.fileModel( {
										'id': file.id,
										'link': 'images/spinner.gif'
									} );
								newFile.set( { pending: true } );
								app.filelistViewInstance.collection.add( newFile );
							}

						} );

						up.start();
					},

					UploadProgress: function ( up, file ) {
					},

					FileUploaded: function ( up, file, response ) {
						var data = jQuery.parseJSON( response.response );
						$.each( data['media'], function ( i, elem ) {
							var cid = $( '#file-' + file.id ).data( 'id' );
							var newFile = app.filelistViewInstance.collection.get( cid );
							newFile.set( elem );
							newFile.set( { pending: false } );
						} );
					},

					UploadComplete: function ( up, file ) {
						up.splice();
					},

					Error: function ( up, err ) {
						document.getElementById( 'console' ).innerHTML += "\nError #" + err.code + ": " + err.message;
					}
				}

			} );

			var $document = $( document );
			$document.on( 'dragover.sulfur', '#the-body', function () {
				$( '#the-body' ).addClass( 'dragged' );
			} );

			$document.on( 'drop.sulfur', '#the-body', function () {
				$( '#the-body' ).removeClass( 'dragged' );
			} );

			$document.on( 'dragleave.sulfur', '#the-body', function () {
				$( '#the-body' ).removeClass( 'dragged' );
			} );


			this.uploader.init();
		},

		remove: function(){
			$( document ).off( '.sulfur' );

			Backbone.View.prototype.remove.apply( this, arguments );
		}

	} );

	return app.pickerView;
});