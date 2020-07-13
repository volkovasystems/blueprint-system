"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_TEMPLATE_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"template"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_TEMPLATE_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform template path",
			"invalid platform template path directory",

			"platform template path:",
			PLATFORM_TEMPLATE_PATH
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
		"cannot manifest platform template path",
		"invalid platform template path directory",

		"platform template path:",
		PLATFORM_TEMPLATE_PATH,

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
	"PLATFORM_TEMPLATE_PATH",
	PLATFORM_TEMPLATE_PATH
);

module.exports = PLATFORM_TEMPLATE_PATH;
