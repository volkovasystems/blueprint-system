"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
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
						{
							option
						}
					=	(
							await	load(
										(
											option
										)
									)
						);

						{
							option
						}
					=	(
							await	shell(
										(
											option
										)
									)
						);

						{
							option
						}
					=	(
							await	boot(
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

module.exports = index;
