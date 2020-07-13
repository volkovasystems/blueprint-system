"use strict";

const called = require( "called" );
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const restrictShellParameterSchemaList = (
	async	function restrictShellParameterSchemaList( option, callback ){
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

				const shellParameterSchemaList = (
						(
								(
										(
												"SHELL_PARAMETER_SCHEMA_LIST"
											in	global
										)
									=== true
								)

							&&	(
										typeof
										SHELL_PARAMETER_SCHEMA_LIST
									==	"object"
								)

							&&	(
										SHELL_PARAMETER_SCHEMA_LIST
									!==	null
								)

							&&	(
										Array
										.isArray(
											SHELL_PARAMETER_SCHEMA_LIST
										)
									===	true
								)

							&&	(
										SHELL_PARAMETER_SCHEMA_LIST
										.length
									>	0
								)
						)
					?	SHELL_PARAMETER_SCHEMA_LIST
					:	(
								(
										(
												(
														"shellParameterSchemaList"
													in	option
												)
											=== true
										)

									&&	(
												typeof
												option
												.shellParameterSchemaList
											==	"object"
										)

									&&	(
												option
												.shellParameterSchemaList
											!==	null
										)

									&&	(
												Array
												.isArray(
													option
													.shellParameterSchemaList
												)
											===	true
										)

									&&	(
												option
												.shellParameterSchemaList
												.length
											>	0
										)
								)
							?	(
									option
									.shellParameterSchemaList
								)
							:	undefined
						)
				);

				const shellParameterSchemaListStatus = (
						(
								typeof
								shellParameterSchemaList
							==	"object"
						)

					&&	(
								shellParameterSchemaList
							!==	null
						)

					&&	(
								Array
								.isArray(
									shellParameterSchemaList
								)
							===	true
						)

					&&	(
								shellParameterSchemaList
								.length
							>	0
						)
				);

				if(
						shellParameterSchemaListStatus
					===	true
				){
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
							targetPlatformServiceListStatus
						===	true
					){
						let shellParameterSchemaListLength = (
							shellParameterSchemaList
							.length
						);

						let shellParameterSchemaData = undefined;

						checkShellParameterSchemaListTargetPlatformService$:
						for(
							let	shellParameterSchemaIndex = 0;

							(
									shellParameterSchemaIndex
								<	shellParameterSchemaListLength
							);

							shellParameterSchemaIndex++
						){
								shellParameterSchemaData
							=	(
									shellParameterSchemaList[
										shellParameterSchemaIndex
									]
								);

							if(
									(
											typeof
											shellParameterSchemaData
										==	"object"
									)

								&&	(
											shellParameterSchemaData
										!==	null
									)

								&&	(
											targetPlatformServiceList
											.includes(
												shellParameterSchemaData
												.platform
											)
										!==	true
									)
							){
								shellParameterSchemaList
								.splice(
									shellParameterSchemaIndex,
									1
								);

								shellParameterSchemaIndex = -1;

									shellParameterSchemaListLength
								=	(
										shellParameterSchemaList
										.length
									);

								continue
								checkShellParameterSchemaListTargetPlatformService$;
							}
						}
					}
					else{
						let shellParameterSchemaListLength = (
							shellParameterSchemaList
							.length
						);

						let shellParameterSchemaData = undefined;

						checkShellParameterSchemaList$:
						for(
							let	shellParameterSchemaIndex = 0;

							(
									shellParameterSchemaIndex
								<	shellParameterSchemaListLength
							);

							shellParameterSchemaIndex++
						){
								shellParameterSchemaData
							=	(
									shellParameterSchemaList[
										shellParameterSchemaIndex
									]
								);

							if(
									(
											typeof
											shellParameterSchemaData
										==	"object"
									)

								&&	(
											shellParameterSchemaData
										!==	null
									)

								&&	(
											shellParameterSchemaData
											.platform
										!== "generic"
									)
							){
								shellParameterSchemaList
								.splice(
									shellParameterSchemaIndex,
									1
								);

								shellParameterSchemaIndex = -1;

									shellParameterSchemaListLength
								=	(
										shellParameterSchemaList
										.length
									);

								continue
								checkShellParameterSchemaList$;
							}
						}
					}

					const shellParameterSchemaReferenceList = (
						shellParameterSchemaList
						.map(
							shellParameterSchemaData => (
								shellParameterSchemaData
								.reference
							)
						)
					);

						option
						.shellParameterSchemaReferenceList
					=	shellParameterSchemaReferenceList;

					hardenProperty(
						"SHELL_PARAMETER_SCHEMA_REFERENCE_LIST",
						shellParameterSchemaReferenceList
					);

					let shellProgram = (
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
											global
											.SHELL_PROGRAM
										==	"object"
									)

								&&	(
											global
											.SHELL_PROGRAM
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
												=== true
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

					if(
							(
									typeof
									shellProgram
								!=	"object"
							)
						||	(
									shellProgram
								===	null
							)
					){
						/*;
							@todo-note:
								If the shellProgram is not existent
								then detour flow for alternative support.
							@end-todo-note
						*/
					}

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
									shellProgram
									.options
								==	"object"
							)
					){
						const shellProgramOptionProperty = "options";

						const shellProgramOptionList = (
							shellProgram[ shellProgramOptionProperty ]
						);

						if(
								(
										shellProgramOptionList
									!== null
								)

							&&	(
										Array
										.isArray(
											shellProgramOptionList
										)
									===	true
								)

							&&	(
										shellProgramOptionList
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

							let shellProgramOptionListLength = (
								shellProgramOptionList
								.length
							);

							let shellProgramOptionData = undefined;

							checkShellProgramOptionList$:
							for(
								let	shellProgramOptionIndex = 0;

								(
										shellProgramOptionIndex
									<	shellProgramOptionListLength
								);

								shellProgramOptionIndex++
							){
									shellProgramOptionData
								=	(
										shellProgramOptionList[
											shellProgramOptionIndex
										]
									);

								if(
										(
												shellParameterSchemaReferenceSetPattern
												.test(
													shellProgramOptionData
													.description
												)
											!==	true
										)

									&&	(
												shellParameterSchemaReferencePattern
												.test(
													shellProgramOptionData
													.description
												)
											===	true
										)
								){
									shellProgramOptionList
									.splice(
										shellProgramOptionIndex,
										1
									);

									shellProgramOptionIndex = -1;

										shellProgramOptionListLength
									=	(
											shellProgramOptionList
											.length
										);

									continue
									checkShellProgramOptionList$;
								}
								else{
									if(
											targetPlatformServiceListStatus
										===	true
									){

									}
									else{
											shellProgramOptionData
											.description
										=	(
												shellProgramOptionData
												.description
												.replace(
													shellParameterSchemaReferenceSetPattern,
													"[generic option]"
												)
											);
									}
								}
							}
						}
					}
				}

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = restrictShellParameterSchemaList;
