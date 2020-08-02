"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
);

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const coreLoad = (
	require( `${ __dirname }/load/load.js` )
);

const PLATFORM_LOAD_PROCESS_STATE = (
	Symbol
	.for(
		(
			"platform-load-process"
		)
	)
);

const PLATFORM_LOAD_DONE_STATE = (
	Symbol
	.for(
		(
			"platform-load-done"
		)
	)
);

const PLATFORM_LOAD_STATE = (
	[ ]
);

hardenProperty(
	(
		"PLATFORM_LOAD_STATE"
	),
	(
		PLATFORM_LOAD_STATE
	)
);

const load = (
	async	function load( option, callback ){
					{
						option,
						callback
					}
				=	procedure(
						(
							arguments
						)
					);

				try{

				}
				catch( error ){

				}

				return	(
							await	callback(
								 		(
											option
										)
									)
						);
			}
);

module.exports = load;
