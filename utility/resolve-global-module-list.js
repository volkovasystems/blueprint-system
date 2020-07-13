"use strict";

const called = require( "called" );
const fs = require( "fs" ).promises;
const glob = require( "fast-glob" );
const path = require( "path" );
const util = require( "util" );

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const resolveGlobPathQueryFormat = (
	require( `${ PLATFORM_UTILITY_PATH }/resolve-glob-path-query-format.js` )
);

const GLOBAL_MODULE_LIST_CONFIGURE_PATH = (
	path
	.resolve(
		PLATFORM_CONFIGURE_PATH,
		"global-module-list.json"
	)
);

const resolveGlobalModuleList = (
	async	function resolveGlobalModuleList( option, callback ){
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

				const globalModuleList = [ ];

				try{
					JSON
					.parse(
						(
							await	fs
									.readFile(
										GLOBAL_MODULE_LIST_CONFIGURE_PATH
									)
						)
					)
					.forEach(
						( globalModuleData ) =>	{
							globalModuleList
							.push(
								globalModuleData
								.value
							);
						}
					);
				}
				catch( error ){
					console
					.error(
						"cannot resolve global module",
						"cannot load global module list configure",

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

				try{
					await	Promise
							.all(
								(
									await	glob(
												(
													globalModuleList
													.map(
														( globPathQuery ) => (
															resolveGlobPathQueryFormat(
																globPathQuery
															)
														)
													)
												),

												{
													"absolute": true,
													"dot": true
												}
											)
								)
								.map(
									( globalModulePath ) =>	{
										const globalModule = require( globalModulePath );

										if(
												typeof
												globalModule
											==	"function"
										){
											return	globalModule;
										}
										else{
											return	undefined;
										}
									}
								)
								.filter(
									( globalModule ) => (
											typeof
											globalModule
										==	"function"
									)
								)
								.map(
									( globalModule ) => {
										return	(
													async	function( ){
																return	(
																			await	globalModule( )
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
						"cannot resolve global module",
						"cannot load global module",

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

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = resolveGlobalModuleList;
