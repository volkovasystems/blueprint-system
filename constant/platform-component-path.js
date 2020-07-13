"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_COMPONENT_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"component"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_COMPONENT_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform component path",
			"invalid platform component path directory",

			"platform component path:",
			PLATFORM_COMPONENT_PATH
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
		"cannot manifest platform component path",
		"invalid platform component path directory",

		"platform component path:",
		PLATFORM_COMPONENT_PATH,

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
	"PLATFORM_COMPONENT_PATH",
	PLATFORM_COMPONENT_PATH
);

module.exports = PLATFORM_COMPONENT_PATH;
