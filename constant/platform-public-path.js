"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_PUBLIC_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"public"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_PUBLIC_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform public path",
			"invalid platform public path directory",

			"platform public path:",
			PLATFORM_PUBLIC_PATH
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
		"cannot manifest platform public path",
		"invalid platform public path directory",

		"platform public path:",
		PLATFORM_PUBLIC_PATH,

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
	"PLATFORM_PUBLIC_PATH",
	PLATFORM_PUBLIC_PATH
);

module.exports = PLATFORM_PUBLIC_PATH;
