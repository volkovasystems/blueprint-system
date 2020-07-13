"use strict";

require( "./platform-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const PLATFORM_UTILITY_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"utility"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_UTILITY_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform utility path",
			"invalid platform utility path directory",

			"platform utility path:",
			PLATFORM_UTILITY_PATH
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
		"cannot manifest platform utility path",
		"invalid platform utility path directory",

		"platform utility path:",
		PLATFORM_UTILITY_PATH,

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

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

hardenProperty(
	"PLATFORM_UTILITY_PATH",
	PLATFORM_UTILITY_PATH
);

module.exports = PLATFORM_UTILITY_PATH;
