#! /usr/bin/env node

"use strict";

const called = require( "called" );
const commander = require( "commander" );
const util = require( "util" );

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const load = (
	require( `${ __dirname }/load.js` )
);

const index = (
	require( `${ __dirname }/index.js` )
);

const shell = (
	async	function shell( option, callback ){
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

				const shellProgram = (
					new	commander
						.Command( )
				);

				hardenProperty(
					"SHELL_PROGRAM",
					shellProgram
				);

				try{
					await	load( );
				}
				catch( error ){
					console
					.error(
						"cannot load platform",

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

				shellProgram
				.setMaxListeners( Infinity )
				.version(
					PLATFORM_PACKAGE
					.version
				);

				try{
					await	index(
								{
									"shellProgram": shellProgram
								},
								function( trigger, result, optionData ){

								}
							);
				}
				catch( error ){
					console
					.error(
						"cannot boot platform",

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

	}
);

if(
		(
				process
				.argv
				.includes(
					"--run-serv"
				)
			===	true
		)
	||	(
				process
				.argv
				.includes(
					"--run-service"
				)
			===	true
		)
){
	shell( );
}

module.exports = shell;
