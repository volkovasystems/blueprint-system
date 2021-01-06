"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
);

const coreBoot = (
	require( `${ __dirname }/boot/boot.js` )
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
						{
							option
						}
					=	(
							await	coreBoot(
										(
											option
										)
									)
						);
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
