"use strict";

const called = require( "called" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const PLATFORM_SERVICE_FINALIZE_DONE_STATE = (
	Symbol
	.for(
		"platform-service-finalize-done"
	)
);

const PLATFORM_SERVICE_FINALIZE_STATE = [ ];

hardenProperty(
	"PLATFORM_SERVICE_FINALIZE_STATE",
	PLATFORM_SERVICE_FINALIZE_STATE
);

const finalize = (
	async	function finalize( option, callback ){
				option = (
						option
					||	{ }
				);

				if(
						typeof
						callback
					==	"function"
				){
					callback = called( callback );
				}

				if(
						typeof
						option
						.trigger
					!=	"undefined"
				){
					return	(
								await	proceedCallback(
											option,
											callback
										)
							);
				}

				if(
						PLATFORM_SERVICE_FINALIZE_STATE
						.includes(
							PLATFORM_SERVICE_FINALIZE_DONE_STATE
						)
					===	true
				){
					return	(
								await	proceedCallback(
											option,
											callback
										)
							);
				}

				try{
					await	Promise
							.all(
								PLATFORM_SERVICE_LIST
								.map(
									( platformServiceData ) => (
										path
										.resolve(
											PLATFORM_PATH,
											(
												platformServiceData
												.namespace
											),
											"boot/finalize.js"
										)
									)
								)
								.map(
									( finalizeProcedurePath ) => {
										const finalizeProcedure = (
											require( finalizeProcedurePath )
										);

										if(
												typeof
												finalizeProcedure
											==	"function"
										){
											return	finalizeProcedure;
										}
										else{
											return	undefined;
										}
									}
								)
								.filter(
									( finalizeProcedure ) => (
											typeof
											finalizeProcedure
										==	"function"
									)
								)
								.map(
									( finalizeProcedure ) => {
										return	(
													async	function( ){
																return	(
																			await	finalizeProcedure( option )
																		);
															}
												)( );
									}
								)
							);
				}
				catch( error ){
					console
					.error(
						"cannot proceed execute finalize procedure",

						"error data:",
						(
							util
							.inspect(
								error
							)
						)
					);

						option
						.trigger
					=	error;

						option
						.result
					=	false;

					return	(
								await	proceedCallback(
											option,
											callback
										)
							);
				}

				PLATFORM_SERVICE_FINALIZE_STATE
				.push(
					PLATFORM_SERVICE_FINALIZE_DONE_STATE
				);

					option
					.result
				=	(
							option
							.result
						||	true
					);

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = finalize;
