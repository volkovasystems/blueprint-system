"use strict";

const called = require( "called" );
const harden = require( "harden" );
const util = require( "util" );

const hardenProperty = (
	require( `${ __dirname }/utility/harden-property.js` )
);

const load = (
	require( `${ __dirname }/load.js` )
);

const boot = (
	require( `${ __dirname }/boot.js` )
);

const PLATFORM_INDEX_DONE_STATE = (
	Symbol
	.for(
		"platform-index-done"
	)
);

const PLATFORM_INDEX_STATE = [ ];

hardenProperty(
	"PLATFORM_INDEX_STATE",
	PLATFORM_INDEX_STATE
);

const index = (
	async	function index( option, callback ){
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
						PLATFORM_INDEX_STATE
						.includes(
							PLATFORM_INDEX_DONE_STATE
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

				try{
					await	load( option );
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

				try{
					await	boot( option );
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

				PLATFORM_INDEX_STATE
				.push(
					PLATFORM_INDEX_DONE_STATE
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

module.exports = index;
