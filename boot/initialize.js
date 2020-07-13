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

const PLATFORM_SERVICE_INITIALIZE_DONE_STATE = (
	Symbol
	.for(
		"platform-service-initialize-done"
	)
);

const PLATFORM_SERVICE_INITIALIZE_STATE = [ ];

hardenProperty(
	"PLATFORM_SERVICE_INITIALIZE_STATE",
	PLATFORM_SERVICE_INITIALIZE_STATE
);

const initialize = (
	async	function initialize( option, callback ){
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
						PLATFORM_SERVICE_INITIALIZE_STATE
						.includes(
							PLATFORM_SERVICE_INITIALIZE_DONE_STATE
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
											"boot/initialize.js",
										)
									)
								)
								.map(
									( initializeProcedurePath ) => {
										const initializeProcedure = (
											require( initializeProcedurePath )
										);

										if(
												typeof
												initializeProcedure
											==	"function"
										){
											return	initializeProcedure;
										}
										else{
											return	undefined;
										}
									}
								)
								.filter(
									( initializeProcedure ) => (
											typeof
											initializeProcedure
										==	"function"
									)
								)
								.map(
									( initializeProcedure ) => {
										return	(
													async	function( ){
																return	(
																			await	initializeProcedure( option )
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
						"cannot proceed execute initialize procedure",

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


				PLATFORM_SERVICE_INITIALIZE_STATE
				.push(
					PLATFORM_SERVICE_INITIALIZE_DONE_STATE
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

module.exports = initialize;
