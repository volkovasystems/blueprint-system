"use strict";

require( "./platform-path.js" );
require( "./platform-package.js" );

const os = require( "os" );
const path = require( "path" );
const util = require( "util" );

const PLATFORM_NAMESPACE = (
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
				path
				.resolve(
					__dirname,
					"../"
				)
				.split(
					path
					.sep
				)
			);

			const platformPathNamespace = (
				homeDirectoryPathTokenList
				.filter(
					pathToken => (
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
						pathToken => (
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

			const platformPackageNamespace = (
				PLATFORM_PACKAGE
				.name
			);

			if(
					platformPathNamespace
				===	platformPackageNamespace
			){
				return 	platformPackageNamespace;
			}
			else{
				console
				.error(
					"cannot determine platform namespace",
					"different platform package and path namespace",

					"platform path namespace:",
					platformPathNamespace,

					"platform package namespace:",
					platformPackageNamespace
				);

				process
				.exit(
					1
				);
			}
		}
	)( )
);

const hardenProperty = (
	require( `${ PLATFORM_PATH }/utility/harden-property.js` )
);

hardenProperty(
	"PLATFORM_NAMESPACE",
	PLATFORM_NAMESPACE
);

module.exports = PLATFORM_NAMESPACE;
