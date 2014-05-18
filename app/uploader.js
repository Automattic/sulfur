define([
	'jquery',
	'underscore',
	'plupload',
], function( $, _, Backbone ) {
	var uploader = new plupload.Uploader( {
		runtimes      : 'html5,html4',
		browse_button : 'pickfiles', // you can pass in id...
		container     : document.getElementById( 'file-container' ), // ... or DOM Element itself
		url           : 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/new',
		file_data_name: 'media[]',
		headers       : { Authorization: "Bearer " + app.auth.accessToken },
		drop_element  : document.getElementById( 'the-body' ),
		filters       : {
			max_file_size: '10mb',
			mime_types   : [
				{title: "Image files", extensions: "jpg,gif,png,jpeg"},
			]
		},

		init: {
			FilesAdded: function(up, files) {
				plupload.each(files, function( file ) {
					var thumbnail = new mOxie.Image();
					thumbnail.onload = function() {
						thumbnail.downsize( 150, 150 );
						var newFile = new app.fileModel( { 'id' : file.id, 'link' : thumbnail.getAsDataURL() } );
						app.filelistViewInstance.listenTo( newFile, "change:[pending]", app.filelistViewInstance.togglePending );
						newFile.pending = true;
						app.filelistViewInstance.collection.add( newFile );
					};

					thumbnail.load( file.getSource() );

				} );

				up.start();
			},

			UploadProgress: function ( up, file ) {
				// document.getElementById( file.id ).getElementsByTagName( 'b' )[0].innerHTML = '<span>' + file.percent + "%</span>";
			},

			FileUploaded: function ( up, file, response ) {
				var data = jQuery.parseJSON(response.response);
				$.each( data['media'], function( i, elem ) {
					var cid = $( '#file-' + file.id ).data( 'id' );
					var newFile = app.filelistViewInstance.collection.get( cid );
					// console.log(newFile);
					// TODO add the new information to the model
					// newFile.extend( elem );
					newFile.pending = false;
				} );
			},

			Error: function ( up, err ) {
				document.getElementById( 'console' ).innerHTML += "\nError #" + err.code + ": " + err.message;
			}
		}
	} );

	uploader.init();

	$( document ).on( 'dragover', '#the-body', function () {
		$( '#the-body' ).addClass( 'dragged' );
	} );

	$( document ).on( 'drop', '#the-body', function () {
		$( '#the-body' ).removeClass( 'dragged' );
	} );

	$( document ).on( 'dragleave', '#the-body', function () {
		$( '#the-body' ).removeClass( 'dragged' );
	} );

});
