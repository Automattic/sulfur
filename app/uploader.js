var access_token = app.getAccessToken();
	if ( ! access_token ) { return; }

var site_id = localStorage.getItem( 'site_id' );

var uploader = new plupload.Uploader({
	runtimes : 'html5,html4',
	browse_button : 'pickfiles', // you can pass in id...
	container: document.getElementById('container'), // ... or DOM Element itself
	url : 'https://public-api.wordpress.com/rest/v1/sites/' + site_id + '/media/new',
	file_data_name : 'media',
	headers : { Authorization : "Bearer " + access_token },
	drop_element : document.getElementById( 'the-body' ),
	filters : {
		max_file_size : '10mb',
		mime_types: [
			{title : "Image files", extensions : "jpg,gif,png,jpeg"},
		]
	},

	init: {
		PostInit: function() {
			document.getElementById('filelist').innerHTML = '';

			document.getElementById('uploadfiles').onclick = function() {
				uploader.start();
				return false;
			};
		},

		FilesAdded: function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
			});
		},

		UploadProgress: function(up, file) {
			document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
		},

		Error: function(up, err) {
			document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
		}
	}
});

uploader.init();

$( document ).on( 'dragover', '#the-body', function(){
	$( '#the-body' ).addClass( 'dragged' );
} );

$( document ).on( 'drop', '#the-body', function(){
	$( '#the-body' ).removeClass( 'dragged' );
} );

$( document ).on( 'dragleave', '#the-body', function(){
	$( '#the-body' ).removeClass( 'dragged' );
} );
