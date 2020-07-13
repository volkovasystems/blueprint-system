"use strict";

const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

require( "./platform-path.js" );

const PLATFORM_PACKAGE = (
	(
		function( ){
			try{
				return	JSON
						.parse(
							fs
							.readFileSync(
								path
								.resolve(
									PLATFORM_PATH,
									"package.json"
								)
							)
						);
			}
			catch( error ){
				console
				.error(
					"cannot read platform package",

					"error data:",
					(
						util
						.inspect(
							data
						)
					)
				);

				process
				.exit(
					1
				);
			}
		}
	)( )
);

const hardenProperty = (
	require( `${ PLATFORM_PATH }/utility/harden-property.js` )
);

hardenProperty(
	"PLATFORM_PACKAGE",
	PLATFORM_PACKAGE
);

module.exports = PLATFORM_PACKAGE;
