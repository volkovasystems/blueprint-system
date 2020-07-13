"use strict";

SERVICE
.get(
	"/service/interface/ping",
	function( request, response ){
		response
		.json(
			{
				"responseData": ( new Date( ) ).toISOString( )
			}
		);
	}
);
