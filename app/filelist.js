var app = app || {};

if ( ! app.auth.accessToken ) { return; }

var url = 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/';

jQuery.ajax( url, { headers : { authorization : 'BEARER ' + app.auth.accessToken } } )
	.done( function( data, textStatus, jqXHR ) {
		$('#filegrid-title').html( data['found'] + ' items found.' );
		$.each( data['media'], function( i, elem ) {
			$('#filegrid').append( '<img src="' + elem.link + '" width="150" height="150" />' );
		} );
	}
);