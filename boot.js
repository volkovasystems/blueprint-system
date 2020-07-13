"use strict";

const called = require( "called" );
const util = require( "util" );

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const PLATFORM_BOOT_DONE_STATE = (
	Symbol
	.for(
		"platform-boot-done"
	)
);

const PLATFORM_BOOT_STATE = [ ];

hardenProperty(
	"PLATFORM_BOOT_STATE",
	PLATFORM_BOOT_STATE
);

const boot = (
	async	function boot( option, callback ){
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
						PLATFORM_BOOT_STATE
						.includes(
							PLATFORM_BOOT_DONE_STATE
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

				const platformBoot = (
					require( `${ PLATFORM_BOOT_PATH }/boot.js` )
				);

				try{
					await	platformBoot( option );
				}
				catch( error ){
					console
					.error(
						"cannot execute platform boot procedure",

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

				PLATFORM_BOOT_STATE
				.push(
					PLATFORM_BOOT_DONE_STATE
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

module.exports = boot;
