"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_SETTING_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"setting"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_SETTING_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform setting path",
			"invalid platform setting path directory",

			"platform setting path:",
			PLATFORM_SETTING_PATH
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
		"cannot manifest platform setting path",
		"invalid platform setting path directory",

		"platform setting path:",
		PLATFORM_SETTING_PATH,

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
	"PLATFORM_SETTING_PATH",
	PLATFORM_SETTING_PATH
);

module.exports = PLATFORM_SETTING_PATH;
