"use strict";

const called = require( "called" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const restrictPlatformServiceList = (
	async	function restrictPlatformServiceList( option, callback ){
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

				const shellProgram = (
						(
								(
										(
												"SHELL_PROGRAM"
											in	global
										)
									=== true
								)

							&&	(
										typeof
										SHELL_PROGRAM
									==	"object"
								)

							&&	(
										SHELL_PROGRAM
									!==	null
								)
						)
					?	SHELL_PROGRAM
					:	(
								(
										(
												(
														"shellProgram"
													in	option
												)
											===	true
										)

									&&	(
												typeof
												option
												.shellProgram
											==	"object"
										)

									&&	(
												option
												.shellProgram
											!==	null
										)
								)
							?	(
									option
									.shellProgram
								)
							:	undefined
						)
				);

				const shellParameter = (
						(
								(
										(
												"SHELL_PARAMETER"
											in	global
										)
									===	true
								)

							&&	(
										typeof
										SHELL_PARAMETER
									==	"object"
								)

							&&	(
										SHELL_PARAMETER
									!==	null
								)
						)
					?	SHELL_PARAMETER
					:	(
								(
										( "shellParameter" in option ) === true
									&&	typeof option.shellParameter == "object"
									&&	option.shellParameter !== null
								)
							?	(
									option
									.shellParameter
								)
							:	undefined
						)
				);

				const TARGET_PLATFORM_SERVICE_LIST = [ ];

				if(
						(
								typeof
								shellProgram
							==	"object"
						)

					&&	(
								shellProgram
							!==	null
						)

					&&	(
								typeof
								shellParameter
							==	"object"
						)

					&&	(
								shellParameter
							!==	null
						)

					&&	(
								typeof
								shellProgram
								.platformService
							==	"string"
						)

					&&	(
								shellProgram
								.platformService
								.length
							>	0
						)

					&&	(
								typeof
								shellParameter
								.platformService
							==	"string"
						)

					&&	(
								shellParameter
								.platformService
								.length
							>	0
						)

					&&	(
								shellProgram
								.platformService
							===	shellParameter
								.platformService
						)
				){
					shellParameter
					.platformService
					.split(
						/\s*\,\s*/
					)
					.forEach(
						( platformService ) => {
							TARGET_PLATFORM_SERVICE_LIST
							.push(
								platformService
							);
						}
					);
				}
				else{
					const platformServiceShortShellParameter = (
						"--platf-serv"
					);

					const platformServiceShellParameter = (
						"--platformService"
					);

					if(
							(
									process
									.argv
									.includes(
										platformServiceShortShellParameter
									)
								===	true
							)
						||	(
									process
									.argv
									.includes(
										platformServiceShellParameter
									)
								===	true
							)
					){
						const platformServiceTokenIndex = (
								(
										process
										.argv
										.indexOf(
											platformServiceShortShellParameter
										)
									!== -1
								)
							?	(
									process
									.argv
									.indexOf(
										platformServiceShortShellParameter
									)
								)
							:	(
										(
												process
												.argv
												.indexOf(
													platformServiceShellParameter
												)
											!== -1
										)
									?	(
											process
											.argv
											.indexOf(
												platformServiceShellParameter
											)
										)
									:	undefined
								)
						);

						const platformServiceValueTokenIndex = (
								(
										typeof
										platformServiceTokenIndex
									==	"number"
								)
							?	(
										platformServiceTokenIndex
									+	1
								)
							:	undefined
						);

						process
						.argv[
							platformServiceValueTokenIndex
						]
						.split(
							/\s*\,\s*/
						)
						.forEach(
							( platformService ) => {
								TARGET_PLATFORM_SERVICE_LIST
								.push(
									platformService
								);
							}
						);
					}
				}

				Object
				.freeze(
					TARGET_PLATFORM_SERVICE_LIST
				);

					option
					.targetPlatformServiceList
				=	TARGET_PLATFORM_SERVICE_LIST;

				hardenProperty(
					"TARGET_PLATFORM_SERVICE_LIST",
					TARGET_PLATFORM_SERVICE_LIST
				);

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = restrictPlatformServiceList;
