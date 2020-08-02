#! /usr/bin/env node

"use strict";

const util = require( "util" );

const procedure = (
	require( `${ __dirname }/utility/procedure.js` )
);

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const coreShell = (
	require( `${ __dirname }/shell/shell.js` )
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
