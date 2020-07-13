"use strict";

const called = require( "called" );
const glob = require( "fast-glob" );
const util = require( "util" );

const bodyParser = require( "body-parser" );
const compression = require( "compression" );
const cookieParser = require( "cookie-parser" );
const express = require( "express" );
const expresSession = require( "express-session" );
const helmet = require( "helmet" );
const methodOverride = require( "method-override" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const resolveGlobPathQueryFormat = (
	require( `${ PLATFORM_UTILITY_PATH }/resolve-glob-path-query-format.js` )
);

const PLATFORM_SERVICE_SERVER_DONE_STATE = (
	Symbol
	.for(
		"platform-service-server-done"
	)
);

const PLATFORM_SERVICE_SERVER_STATE = [ ];

hardenProperty(
	"PLATFORM_SERVICE_SERVER_STATE",
	PLATFORM_SERVICE_SERVER_STATE
);

const PLATFORM_SERVICE_MODULE_PATH_QUERY = (
	`${ PLATFORM_SERVICE_PATH }/**/*.js`
);

const server = (
	async	function server( option, callback ){
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
						PLATFORM_SERVICE_SERVER_STATE
						.includes(
							PLATFORM_SERVICE_SERVER_DONE_STATE
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

				const platformIPAddress = (
					SHELL_PARAMETER
					.platformIPAddress
				);

				const platformPortNumber = (
					SHELL_PARAMETER
					.platformPortNumber
				);

				const SERVICE = express( );

				SERVICE
				.use(
					methodOverride( )
				);

				SERVICE
				.use(
					bodyParser
					.urlencoded(
						{
							"extended": true,
							"limit": "16mb"
						}
					)
				);

				SERVICE
				.use(
					bodyParser
					.json(
						{
							"limit": "16mb"
						}
					)
				);

				SERVICE
				.use(
					cookieParser( )
				);

				SERVICE
				.use(
					helmet( )
				);

				hardenProperty(
					"SERVICE",
					SERVICE
				);

					option
					.service
				=	SERVICE;

				(
					await	glob(
								resolveGlobPathQueryFormat(
									PLATFORM_SERVICE_MODULE_PATH_QUERY
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

				(
					await	glob(
								(
									PLATFORM_SERVICE_LIST
									.map(
										( platformServiceData ) => (
											resolveGlobPathQueryFormat(
												[
													PLATFORM_PATH,
													(
														platformServiceData
														.namespace
													),
													"service",
													"**/*.js"
												]
												.join(
													"/"
												)
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
				.forEach(
					require
				);

				process
				.nextTick(
					function( ){
						SERVICE
						.listen(
							platformPortNumber,
							platformIPAddress,

							function( ){
								console
								.log(
									"boot server done",

									"server ip address:",
									platformIPAddress,

									"server port number:",
									platformPortNumber
								);
							}
						);
					}
				);

				PLATFORM_SERVICE_SERVER_STATE
				.push(
					PLATFORM_SERVICE_SERVER_DONE_STATE
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

module.exports = server;
