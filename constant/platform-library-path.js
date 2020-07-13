"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_LIBRARY_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"library"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_LIBRARY_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform library path",
			"invalid platform library path directory",

			"platform library path:",
			PLATFORM_LIBRARY_PATH
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
		"cannot manifest platform library path",
		"invalid platform library path directory",

		"platform library path:",
		PLATFORM_LIBRARY_PATH,

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
	"PLATFORM_LIBRARY_PATH",
	PLATFORM_LIBRARY_PATH
);

module.exports = PLATFORM_LIBRARY_PATH;
