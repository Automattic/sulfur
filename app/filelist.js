var access_token = app.getAccessToken();
	if ( ! access_token ) { return; }

var site_id = localStorage.getItem( 'site_id' );

var url = 'https://public-api.wordpress.com/rest/v1/sites/' + site_id + '/media/';

jQuery.ajax( url, { headers : { authorization : 'BEARER ' + access_token } } )
	.done( function( data, textStatus, jqXHR ) {
		$('#filegrid-title').html( data['found'] + ' items found.' );
		$.each( data['media'], function( i, elem ) {
			$('#filegrid').append( '<img src="' + elem.link + '" width="150" height="150" />' );
		} );
	}
);