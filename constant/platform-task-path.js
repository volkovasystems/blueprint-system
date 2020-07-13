"use strict";

require( "./platform-path.js" );
require( "./platform-utility-path.js" );

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const PLATFORM_TASK_PATH = (
	path
	.resolve(
		PLATFORM_PATH,
		"task"
	)
);

try{
	if(
			fs
			.statSync(
				PLATFORM_TASK_PATH
			)
			.isDirectory( )
		!==	true
	){
		console
		.error(
			"cannot manifest platform task path",
			"invalid platform task path directory",

			"platform task path:",
			PLATFORM_TASK_PATH
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
		"cannot manifest platform task path",
		"invalid platform task path directory",

		"platform task path:",
		PLATFORM_TASK_PATH,

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
	"PLATFORM_TASK_PATH",
	PLATFORM_TASK_PATH
);

module.exports = PLATFORM_TASK_PATH;
