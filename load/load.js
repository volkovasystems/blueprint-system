"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
);

const load =  (
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
