"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
);

const shell = (
	async	function shell( option, callback ){
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

module.exports = shell;
