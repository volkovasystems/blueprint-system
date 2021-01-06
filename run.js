#! /usr/bin/env node

"use strict";

const index = (
	require( `${ __dirname }/index.js` )
);

(
	async	function( ){
				(
					await	index( );
				);
			}
)( );
