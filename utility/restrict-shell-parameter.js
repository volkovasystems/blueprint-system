"use strict";

const called = require( "called" );
const util = require( "util" );

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const restrictShellParameter = (
	async	function restrictShellParameter( option, callback ){
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

				const shellParameter = (
						(
								(
										(
												"SHELL_PARAMETER"
											in	global
										)
									=== true
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

							&&	(
										Object
										.keys(
											SHELL_PARAMETER
										)
										.length
									>	0
								)
						)
					?	SHELL_PARAMETER
					:	(
								(
										(
												(
														"shellParameter"
													in	option
												)
											=== true
										)

									&&	(
												typeof
												option
												.shellParameter
											==	"object"
										)

									&&	(
												option
												.shellParameter
											!==	null
										)

									&&	(
												Object
												.keys(
													option
													.shellParameter
												)
												.length
											>	0
										)
								)
							?	(
									option
									.shellParameter
								)
							:	undefined
						)
				);

				const shellParameterStatus = (
						(
								typeof
								shellParameter
							==	"object"
						)

					&&	(
								shellParameter
							!==	null
						)

					&&	(
								Object
								.keys(
									shellParameter
								)
								.length
							>	0
						)
				);

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
						(
								shellParameterSchemaListStatus
							===	true
						)
					&&	(
								shellParameterStatus
							===	true
						)
				){
					const shellParameterPropertyList = (
						shellParameterSchemaList
						.map(
							( shellParameterSchemaData ) => (
								shellParameterSchemaData
								.property
							)
						)
						.filter(
							( shellParameterSchemaProperty ) => (
									(
											typeof
											shellParameterSchemaProperty
										==	"string"
									)
								&&	(
											shellParameterSchemaProperty
											.length
										>	0
									)
							)
						)
					);

					Object
					.keys(
						shellParameter
					)
					.forEach(
						( shellParameterProperty ) => {
							if(
									shellParameterPropertyList
									.includes(
										shellParameterProperty
									)
								!==	true
							){
								Object
								.defineProperty(
									shellParameter,
									shellParameterProperty,
									{
										"value": undefined,

										"enumerable": false,
										"writable": false,
										"configurable": false
									}
								);
							}
						}
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

module.exports = restrictShellParameter;
