"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
);

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const coreBoot = (
	require( `${ __dirname }/boot/boot.js` )
);

const PLATFORM_BOOT_PROCESS_STATE = (
	Symbol
	.for(
		(
			"platform-boot-process"
		)
	)
);

const PLATFORM_BOOT_DONE_STATE = (
	Symbol
	.for(
		(
			"platform-boot-done"
		)
	)
);

const PLATFORM_BOOT_STATE = (
	[ ]
);

hardenProperty(
	(
		"PLATFORM_BOOT_STATE"
	),
	(
		PLATFORM_BOOT_STATE
	)
);

const boot = (
	async	function boot( option, callback ){
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

module.exports = boot;
