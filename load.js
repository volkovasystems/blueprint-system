"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
);

const coreLoad = (
	require( `${ __dirname }/load/load.js` )
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
						{
							option
						}
					=	(
							await	coreLoad(
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

module.exports = load;
