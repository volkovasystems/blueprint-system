"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
);

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const load = (
	require( `${ __dirname }/load.js` )
);

const shell = (
	require( `${ __dirname }/shell.js` )
);

const boot = (
	require( `${ __dirname }/boot.js` )
);

const PLATFORM_INDEX_PROCESS_STATE = (
	Symbol
	.for(
		(
			"platform-index-process"
		)
	)
);

const PLATFORM_INDEX_DONE_STATE = (
	Symbol
	.for(
		(
			"platform-index-done"
		)
	)
);

const PLATFORM_INDEX_STATE = (
	[ ]
);

hardenProperty(
	(
		"PLATFORM_INDEX_STATE"
	),
	(
		PLATFORM_INDEX_STATE
	)
);

const index = (
	async	function index( option, callback ){
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

module.exports = index;
