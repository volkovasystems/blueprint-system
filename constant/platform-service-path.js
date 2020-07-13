"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_SERVICE_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"service"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_SERVICE_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform service path",
			"invalid platform service path directory",

			"platform service path:",
			PLATFORM_SERVICE_PATH
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
		"cannot manifest platform service path",
		"invalid platform service path directory",

		"platform service path:",
		PLATFORM_SERVICE_PATH,

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
	"PLATFORM_SERVICE_PATH",
	PLATFORM_SERVICE_PATH
);

module.exports = PLATFORM_SERVICE_PATH;
