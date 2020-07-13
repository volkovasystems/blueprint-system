"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_CONFIGURE_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"configure"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_CONFIGURE_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform configure path",
			"invalid platform configure path directory",

			"platform configure path:",
			PLATFORM_CONFIGURE_PATH
		);

		process
		.exit(
			1
		);
	}
}
catch( error ){
	console
	.error(
		"cannot manifest platform configure path",
		"invalid platform configure path directory",

		"platform configure path:",
		PLATFORM_CONFIGURE_PATH,

		"error data:",
		(
			util
			.inspect(
				error
			)
		)
	);

	process
	.exit(
		1
	);
}

hardenProperty(
	"PLATFORM_CONFIGURE_PATH",
	PLATFORM_CONFIGURE_PATH
);

module.exports = PLATFORM_CONFIGURE_PATH;
