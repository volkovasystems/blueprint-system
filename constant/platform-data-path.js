"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_DATA_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"data"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_DATA_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform data path",
			"invalid platform data path directory",

			"platform data path:",
			PLATFORM_DATA_PATH
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
		"cannot manifest platform data path",
		"invalid platform data path directory",

		"platform data path:",
		PLATFORM_DATA_PATH,

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
	"PLATFORM_DATA_PATH",
	PLATFORM_DATA_PATH
);

module.exports = PLATFORM_DATA_PATH;
