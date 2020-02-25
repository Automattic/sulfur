sulfur
======

Media manager written for the WordPress.com &amp; Jetpack [REST API](https://developer.wordpress.com/docs/api/).

Displays all files uploaded to the connected blog and allows you to upload new ones.

### Requirements

Sulfur is a standalone web application that sends requests to the WordPress API. So in order to run it, you only need two things:

1. Some kind of webserver. Apache/nginx/etc.
2. An application on [developer.wordpress.com/apps](https://developer.wordpress.com/apps).

### Installation - Apache

1. git clone https://github.com/Automattic/sulfur (easiest to do this into Apache's document root).
2. Ensure the Apache user has access to the sulfur directory and all parent directories (`chgrp -r www` usually works).
3. Configure your webserver to serve it from your sulfur directory.

On development servers, you can fake the domain:

1. Set your hostfile to map sulfur.dev to 127.0.0.1 (or the IP of the server that will be running it).
2. Use a virtual host configuration so Apache knows you want "sulfur.dev" served from the sulfur directory.

Then, point your browser to the configured domain.

### Application Setup

The application requires a callback URL in order to authenticate with WordPress.com. This can be localhost, or a fake domain, if you just want to test it out locally.

1. Create an app on [developer.wordpress.com](https://developer.wordpress.com/apps).
2. Set the Redirect URL to your app's URL (e.g. sulfur.dev).
3. Whitelist your domains in the JavaScript origins. Incluing https:// if applicable. 
4. Edit `app/config.js` to include your app's Client ID from WordPress.com.
