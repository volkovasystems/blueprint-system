Object
.values(
	(
		await	Promise
				.all(
					(
						await	glob(
									[
										SHELL_PARAMETER_SCHEMA_LIST_PATH_QUERY
									],
									{
										"absolute": true,
										"dot": true
									}
								)
					)
					.map(
						( shellParameterSchemaPath ) => {
							return	(
										async	( ) => {
													return	(
																await	fs
																		.readFile(
																			shellParameterSchemaPath
																		)
															);
												}
									)( );
						}
					)
				)
	)
	.map(
		( shellParameterSchemaContent ) => {
			return	JSON
					.parse( shellParameterSchemaContent );
		}
	)
	.reduce(
		(
			flatShellParameterSchemaList,
			currentShellParameterSchemaList
		) => {
			currentShellParameterSchemaList
			.forEach(
				( shellParameterSchemaData ) => {
					flatShellParameterSchemaList
					.push( shellParameterSchemaData );
				}
			);

			return	flatShellParameterSchemaList;
		},
		[ ]
	)
	.sort(
		(
			currentShellParameterSchemaData,
			nextShellParameterSchemaData
		) => {
			if(
				!	(
							( "order" in currentShellParameterSchemaData ) === true
						&&	typeof currentShellParameterSchemaData.order == "number"
					)

				&&	( "order" in nextShellParameterSchemaData ) === true
				&&	typeof nextShellParameterSchemaData.order == "number"
			){
				return -1;
			}
			else if(
				!	(
							( "order" in nextShellParameterSchemaData ) === true
						&&	typeof nextShellParameterSchemaData.order == "number"
					)

				&&	( "order" in currentShellParameterSchemaData ) === true
				&&	typeof currentShellParameterSchemaData.order == "number"
			){
				return	1;
			}
			else if(
					( "order" in currentShellParameterSchemaData ) === true
				&&	typeof currentShellParameterSchemaData.order == "number"

				&&	( "order" in nextShellParameterSchemaData ) === true
				&&	typeof nextShellParameterSchemaData.order == "number"

				&&	(
							currentShellParameterSchemaData.order
						<	nextShellParameterSchemaData.order
					)
			){
				return	-1;
			}
			else if(
					( "order" in currentShellParameterSchemaData ) === true
				&&	typeof currentShellParameterSchemaData.order == "number"

				&&	( "order" in nextShellParameterSchemaData ) === true
				&&	typeof nextShellParameterSchemaData.order == "number"

				&&	(
							currentShellParameterSchemaData.order
						>	nextShellParameterSchemaData.order
					)
			){
				return 	1;
			}
			else if(
					( "order" in currentShellParameterSchemaData ) === true
				&&	typeof currentShellParameterSchemaData.order == "number"

				&&	( "order" in nextShellParameterSchemaData ) === true
				&&	typeof nextShellParameterSchemaData.order == "number"

				&&	(
							currentShellParameterSchemaData.order
						==	nextShellParameterSchemaData.order
					)
			){
				return	0;
			}
			else{
				return	0;
			}
		}
	)
	.reduce(
		(
			shellParameterSchemaSet,
			shellParameterSchemaData
		) => {
			const parameter = shellParameterSchemaData.parameter;

			shellParameterSchemaSet[ parameter ] = (
					shellParameterSchemaSet[ parameter ]
				||	{ }
			);

			shellParameterSchemaSet[ parameter ] = shellParameterSchemaData

			return	shellParameterSchemaSet;
		},
		{ }
	)
)
.forEach(
	( shellParameterSchemaData ) => {
		shellParameterSchemaList
		.push( shellParameterSchemaData );
	}
);

try{

}
catch( error ){
	console
	.error(
		"cannot resolve shell parameter",

		"error data:",
		(
			util
			.inspect( error )
		)
	);

	option.trigger = error;
	option.result = false;

	return	(
				await	proceedCallback( option, callback )
			);
}
