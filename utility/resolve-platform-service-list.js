"use strict";

const called = require( "called" );
const fs = require( "fs" ).promises;
const util = require( "util" );

const hardenProperty = (
	require( `${ PLATFORM_UTILITY_PATH }/harden-property.js` )
);

const proceedCallback = (
	require( `${ PLATFORM_UTILITY_PATH }/proceed-callback.js` )
);

const PLATFORM_SERVICE_CONFIGURE_PATH = (
	`${ PLATFORM_CONFIGURE_PATH }/platform-service-list.json`
);

const resolvePlatformServiceList = (
	async	function resolvePlatformServiceList( option, callback ){
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

				const platformServiceList = [ ];

				try{
					JSON
					.parse(
						await	fs
								.readFile(
									PLATFORM_SERVICE_CONFIGURE_PATH
								)
					)
					.forEach(
						( platformServiceData ) => {
							platformServiceList
							.push(
								platformServiceData
							)
						}
					);
				}
				catch( error ){
					console
					.error(
						"cannot resolve platform service",

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

				const PLATFORM_SERVICE_LIST = platformServiceList;

				hardenProperty(
					"PLATFORM_SERVICE_LIST",
					PLATFORM_SERVICE_LIST
				);

					option
					.platformServiceList
				=	platformServiceList;

				return	(
							await	proceedCallback(
										option,
										callback
									)
						);
			}
);

module.exports = resolvePlatformServiceList;
