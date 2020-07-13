"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_BOOT_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"boot"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_BOOT_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform boot path",
			"invalid platform boot path directory",

			"platform boot path:",
			PLATFORM_BOOT_PATH
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
		"cannot manifest platform boot path",
		"invalid platform boot path directory",

		"platform boot path:",
		PLATFORM_BOOT_PATH,

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
	"PLATFORM_BOOT_PATH",
	PLATFORM_BOOT_PATH
);

module.exports = PLATFORM_BOOT_PATH;
