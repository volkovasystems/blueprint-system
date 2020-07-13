"use strict";

const called = require( "called" );
const util = require( "util" );

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const restrictShellProgramHelp = (
	async	function restrictShellProgramHelp( option, callback ){
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

				let helpData = (
						option
						.helpData
					||	undefined
				);

				const shellParameterSchemaReferenceList = (
						(
								(
										(
												"SHELL_PARAMETER_SCHEMA_REFERENCE_LIST"
											in	global
										)
									===	true
								)

							&&	(
										typeof
										SHELL_PARAMETER_SCHEMA_REFERENCE_LIST
									==	"object"
								)

							&&	(
										SHELL_PARAMETER_SCHEMA_REFERENCE_LIST
									!== null
								)

							&&	(
										Array
										.isArray(
											SHELL_PARAMETER_SCHEMA_REFERENCE_LIST
										)
									===	true
								)

							&&	(
										SHELL_PARAMETER_SCHEMA_REFERENCE_LIST
										.length
									>	0
								)
						)
					?	SHELL_PARAMETER_SCHEMA_REFERENCE_LIST
					:	(
								(
										(
												(
														"shellParameterSchemaReferenceList"
													in	option
												)
											===	true
										)

									&&	(
												typeof
												option
												.shellParameterSchemaReferenceList
											==	"object"
										)

									&&	(
												option
												.shellParameterSchemaReferenceList
											!== null
										)

									&&	(
												Array
												.isArray(
													option
													.shellParameterSchemaReferenceList
												)
											===	true
										)

									&&	(
												option
												.shellParameterSchemaReferenceList
												.length
											>	0
										)
								)
							?	(
									option
									.shellParameterSchemaReferenceList
								)
							:	undefined
						)
				);

				const targetPlatformServiceList = (
						(
								(
										(
												"TARGET_PLATFORM_SERVICE_LIST"
											in	global
										)
									=== true
								)

							&&	(
										typeof
										TARGET_PLATFORM_SERVICE_LIST
									==	"object"
								)

							&&	(
										TARGET_PLATFORM_SERVICE_LIST
									!==	null
								)

							&&	(
										Array
										.isArray(
											TARGET_PLATFORM_SERVICE_LIST
										)
									===	true
								)
						)
					?	TARGET_PLATFORM_SERVICE_LIST
					:	(
								(
										(
												(
														"targetPlatformServiceList"
													in	option
												)
											=== true
										)

									&&	(
												typeof
												option
												.targetPlatformServiceList
											==	"object"
										)

									&&	(
												option
												.targetPlatformServiceList
											!==	null
										)

									&&	(
												Array
												.isArray(
													option
													.targetPlatformServiceList
												)
											===	true
										)
								)
							?	(
									option
									.targetPlatformServiceList
								)
							:	undefined
						)
				);

				const targetPlatformServiceListStatus = (
						(
								typeof
								targetPlatformServiceList
							==	"object"
						)

					&&	(
								targetPlatformServiceList
							!==	null
						)

					&&	(
								Array
								.isArray(
									targetPlatformServiceList
								)
							===	true
						)

					&&	(
								targetPlatformServiceList
								.length
							>	0
						)
				);

				if(
						(
								typeof
								helpData
							==	"string"
						)

					&&	(
								helpData
								.length
							>	0
						)

					&&	(
								typeof
								shellParameterSchemaReferenceList
							==	"object"
						)

					&&	(
								shellParameterSchemaReferenceList
							!==	null
						)

					&&	(
								Array
								.isArray(
									shellParameterSchemaReferenceList
								)
							===	true
						)

					&&	(
								shellParameterSchemaReferenceList
								.length
							>	0
						)
				){
					const shellParameterSchemaReferenceSetPattern = (
						new	RegExp(
								shellParameterSchemaReferenceList
								.join(
									"|"
								)
							)
					);

					const shellParameterSchemaReferencePattern = (
						/\#[A-Za-z0-9\-\_]{4}\;/
					);

					const helpDataTokenList = (
						helpData
						.split(
							"\n"
						)
					);

					let helpDataTokenListLength = (
						helpDataTokenList
						.length
					);

					let helpDataToken = undefined;

					checkShellProgramHelp$:
					for(
						let	helpDataTokenIndex = 0;

						(
								helpDataTokenIndex
							<	helpDataTokenListLength
						);

						helpDataTokenIndex++
					){
							helpDataToken
						=	(
								helpDataTokenList[
									helpDataTokenIndex
								]
							);

						if(
								(
										shellParameterSchemaReferenceSetPattern
										.test(
											helpDataToken
										)
									!==	true
								)

							&&	(
										shellParameterSchemaReferencePattern
										.test(
											helpDataToken
										)
									===	true
								)
						){
							helpDataTokenList
							.splice(
								helpDataTokenIndex,
								1
							);

							helpDataTokenIndex = -1;

								helpDataTokenListLength
							=	(
									helpDataTokenList
									.length
								);

							continue
							checkShellProgramHelp$;
						}
						else{
							if(
									targetPlatformServiceListStatus
								===	true
							){

							}
							else{
									helpDataToken
								=	(
										helpDataToken
										.replace(
											shellParameterSchemaReferenceSetPattern,
											"[generic option]"
										)
									);
							}

								helpDataTokenList[
									helpDataTokenIndex
								]
							=	helpDataToken;
						}
					}

					if(
							targetPlatformServiceListStatus
						===	true
					){
						helpDataTokenList
						.splice(
							1,
							0,
							`Target Platform Service: ${ targetPlatformServiceList.join( ", " ) }`
						);

						helpDataTokenList
						.splice(
							1,
							0,
							""
						);
					}

						helpData
					=	(
							helpDataTokenList
							.join(
								"\n"
							)
						);

						option
						.helpData
					=	helpData;
				}

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = restrictShellProgramHelp;
