"use strict";

/*;
	@note:
		Load procedure for pre-boot procedure.
	@end-note

	@important-note:
		Do not modify this.

		If you wish to contribute to the
		enhancement of this procedure
		contact the author of this procedure first.
	@end-important-note
*/

const called = require( "called" );
const fs = require( "fs" ).promises;
const glob = require( "fast-glob" );
const os = require( "os" );
const path = require( "path" );
const util = require( "util" );

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const resolveGlobPathQueryFormat = (
	require( `${ __dirname }/utility/resolve-glob-path-query-format.js` )
);

const PLATFORM_LOAD_PROCESS_STATE = (
	Symbol
	.for(
		(
			"platform-load-process"
		)
	)
);

const PLATFORM_LOAD_DONE_STATE = (
	Symbol
	.for(
		(
			"platform-load-done"
		)
	)
);

const PLATFORM_LOAD_STATE = (
	[ ]
);

hardenProperty(
	(
		"PLATFORM_LOAD_STATE"
	),
	(
		PLATFORM_LOAD_STATE
	)
);

const load = (
	async	function load( option, callback ){
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
					if(
							typeof
							callback
						==	"function"
					){
						callback(
							(
								option
								.trigger
							),

							(
								option
								.result
							),

							option
						);
					}

					return	{
								"trigger": (
									option
									.trigger
								),

								"result": (
									option
									.result
								),

								"option": option
							};
				}

				if(
						PLATFORM_LOAD_STATE
						.includes(
							PLATFORM_LOAD_DONE_STATE
						)
					===	true
				){
					if(
							typeof
							callback
						==	"function"
					){
						callback(
							(
								option
								.trigger
							),

							(
								option
								.result
							),

							option
						);
					}

					return	{
								"trigger": (
									option
									.trigger
								),

								"result": (
									option
									.result
								),

								"option": option
							};
				}

				if(
						PLATFORM_LOAD_STATE
						.includes(
							PLATFORM_LOAD_PROCESS_STATE
						)
					===	true
				){
					if(
							typeof
							callback
						==	"function"
					){
						callback(
							(
								option
								.trigger
							),

							(
								option
								.result
							),

							option
						);
					}

					return	{
								"trigger": (
									option
									.trigger
								),

								"result": (
									option
									.result
								),

								"option": option
							};
				}

				PLATFORM_LOAD_STATE
				.push(
					PLATFORM_LOAD_PROCESS_STATE
				);

				/*;
					@note:
						Procedure for determining the platform home directory
						from the shell parameter.
					@end-note
				*/
				try{
					const platformDirectoryShortShellParameter = (
						"--platf-dir"
					);

					const platformDirectoryShellParameter = (
						"--platformDirectory"
					);

					if(
							(
									process
									.argv
									.includes(
										platformDirectoryShortShellParameter
									)
								===	true
							)
						||	(
									process
									.argv
									.includes(
										platformDirectoryShellParameter
									)
								===	true
							)
					){
						const platformDirectoryTokenIndex = (
								(
										process
										.argv
										.indexOf(
											platformDirectoryShortShellParameter
										)
									!== -1
								)
							?	(
									process
									.argv
									.indexOf(
										platformDirectoryShortShellParameter
									)
								)
							:	(
										(
												process
												.argv
												.indexOf(
													platformDirectoryShellParameter
												)
											!== -1
										)
									?	(
											process
											.argv
											.indexOf(
												platformDirectoryShellParameter
											)
										)
									:	undefined
								)
						);

						const platformDirectoryValueTokenIndex = (
								(
										typeof
										platformDirectoryTokenIndex
									==	"number"
								)
							?	(
										platformDirectoryTokenIndex
									+	1
								)
							:	undefined
						);

						const platformDirectory = (
							process
							.argv[
								platformDirectoryValueTokenIndex
							]
						);

						if(
								(
									await	fs
											.stat(
												platformDirectory
											)
								)
								.isDirectory( )
							===	true
						){
							hardenProperty(
								"PLATFORM_DIRECTORY",
								platformDirectory
							);

								option
								.platformDirectory
							=	platformDirectory;
						}
					}
				}
				catch( error ){
					console
					.error(
						"cannot load platform constant module",
						"cannot determine platform directory",

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

					if(
							typeof
							callback
						==	"function"
					){
						callback(
							(
								option
								.trigger
							),

							(
								option
								.result
							),

							option
						);
					}

					return	{
								"trigger": (
									option
									.trigger
								),

								"result": (
									option
									.result
								),

								"option": option
							};
				}

				/*;
					@note:
						Procedure for loading constant module.
					@end-note
				*/
				try{
					(
						await	glob(
									resolveGlobPathQueryFormat(
										path
										.resolve(
											(
												(
													function( ){
														const homeDirectoryPath = (
																(
																		(
																				(
																						"PLATFORM_DIRECTORY"
																					in	global
																				)
																			===	true
																		)
																	&&	(
																				typeof
																				PLATFORM_DIRECTORY
																			==	"string"
																		)
																	&&	(
																				PLATFORM_DIRECTORY
																				.length
																			>	0
																		)
																)
															?	PLATFORM_DIRECTORY
															:	(
																	os
																	.homedir( )
																)
														);

														const homeDirectoryPathTokenList = (
															homeDirectoryPath
															.split(
																path
																.sep
															)
														);

														const platformDirectoryPathTokenList = (
															__dirname
															.split(
																path
																.sep
															)
														);

														return	path
																.resolve(
																	homeDirectoryPath,
																	(
																		homeDirectoryPathTokenList
																		.filter(
																			( pathToken ) => (
																					platformDirectoryPathTokenList
																					.includes(
																						pathToken
																					)
																				===	false
																			)
																		)
																		.concat(
																			platformDirectoryPathTokenList
																			.filter(
																				( pathToken ) => (
																						homeDirectoryPathTokenList
																						.includes(
																							pathToken
																						)
																					===	false
																				)
																			)
																		)
																		.pop( )
																	)
																);
													}
												)( )
											),

											"constant/**/*.js"
										)
									),

									{
										"absolute": true,
										"dot": true
									}
								)
					)
					.forEach(
						require
					);
				}
				catch( error ){
					console
					.error(
						"cannot load platform constant module",

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

					if(
							typeof
							callback
						==	"function"
					){
						callback(
							(
								option
								.trigger
							),

							(
								option
								.result
							),

							option
						);
					}

					return	{
								"trigger": (
									option
									.trigger
								),

								"result": (
									option
									.result
								),

								"option": option
							};
				}

				PLATFORM_LOAD_STATE
				.push(
					PLATFORM_LOAD_DONE_STATE
				);

					option
					.result
				=	(
							option
							.result

						||	true
					);

				if(
						typeof
						callback
					==	"function"
				){
					callback(
						undefined,

						true,

						option
					);
				}

				return	{
							"trigger": undefined,

							"result": true,

							"option": option
						};
			}
);

module.exports = load;
