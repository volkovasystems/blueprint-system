"use strict";

/*;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor

			<
				@license-year-range:
					2020-present
				@end-license-year-range
			>

			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/

const callbackOnce = (
	function callbackOnce( callback ){
		/*;
			@procedure-definition:

			@end-procedure-definition

			@parameter-definition:
				{
					"callback": "
						[
							@type:
									function
							@end-type
						]
					"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "
						[
							@type:
									function
							@end-type
						]
					"
				}
			@end-result-definition

			@trigger-definition:
				{
					"trigger": "
						[
							@type:
									object as Error
							@end-type

							<@tag: callback-called-more-than-once;>
						]
					"
				}
			@end-trigger-definition
		*/

		if(
				(
						typeof
						callback
					==	"function"
				)
		){
			if(
					(
							(
											callback
											.$callData
								instanceof	WeakMap
							)
						===	true
					)

				&&	(
							typeof
							(
								callback
								.$callData
								.get(
									(
										callback
									)
								)
							)
							.$checkCallCount
						==	"function"
					)

				&&	(
							typeof
							(
								callback
								.$callData
								.get(
									(
										callback
									)
								)
							)
							.$addCallCount
						==	"function"
					)
			){
				return	(
							callback
						);
			}
			else if(
					(
							(
											callback
											.$callData
								instanceof	WeakMap
							)
						===	true
					)
			){
				Object
				.defineProperty(
					(
						callback
						.$callData
						.get(
							(
								callback
							)
						)
					),

					(
						"$callCount"
					),

					(
						{
							"value": (
								0
							),

							"configurable": (
								false
							),

							"enumerable": (
								false
							),

							"writable": (
								true
							)
						}
					)
				);

				Object
				.defineProperty(
					(
						callback
						.$callData
						.get(
							(
								callback
							)
						)
					),

					(
						"$addCallCount"
					),

					(
						{
							"value": (
								function addCallCount( ){
									(
										callback
										.$callData
										.get(
											(
												callback
											)
										)
									)
									.$callCount++;
								}
							),

							"configurable": (
								false
							),

							"enumerable": (
								false
							),

							"writable": (
								false
							)
						}
					)
				);

				Object
				.defineProperty(
					(
						callback
						.$callData
						.get(
							(
								callback
							)
						)
					),

					(
						"$checkCallCount"
					),

					(
						{
							"value": (
								function $checkCallCount( ){
									return	(
													(
														callback
														.$callData
														.get(
															(
																callback
															)
														)
													)
													.$callCount
												<	1
											);
								}
							),

							"configurable": false,
							"enumerable": false,
							"writable": false
						}
					)
				);

				if(
						(
								Array
								.isArray(
									(
										(
											callback
											.$callData
											.get(
												(
													callback
												)
											)
										)
										.$effectList
									)
								)
							===	true
						)
				){
					(
						callback
						.$callData
						.get(
							(
								callback
							)
						)
					)
					.$effectList
					.push(
						function effect(
							procedure,
							parameterList,
							result,
							scope
						){
							if(
									(
											(
												callback
												.$callData
												.get(
													(
														callback
													)
												)
												.$checkCallCount( )
											)
										===	false
									)
							){
								const callCount = (
									callback
									.$callData
									.get(
										(
											callback
										)
									)
									.$callCount
								);

								throw	(
											new	Error(
													[
														"#callback-called-more-than-once;",

														"cannot execute callback;",
														"callback called more than once;",

														"@call-count:",
														`${ callCount };`
													]
												)
										);
							}
							else{
								callback
								.$callData
								.get(
									(
										callback
									)
								)
								.$addCallCount( );
							}

							return	(
										result
									);
						}
					);
				}

				return	(
							callback
						);
			}
			else{
				const delegateCallback = (
					function delegateCallback( ){
						let result = (
							undefined
						);

						try{
								result
							=	(
									callback
									.apply(
										(
											this
										),
										(
											arguments
										)
									)
								);
						}
						catch( error ){
								result
							=	(
									error
								);
						}
						finally{
							return	(
										delegateCallback
										.$callData
										.get(
											(
												delegateCallback
											)
										)
										.$callEffect(
											callback,
											arguments,
											result,
											this
										)
									);
						}
					}
				);

				Object
				.defineProperty(
					(
						delegateCallback
					),

					(
						"$callData"
					),

					(
						{
							"value": (
								(
									new	WeakMap( )
								)
								.set(
									(
										delegateCallback
									),
									(
										{ }
									)
								)
							),

							"configurable": (
								false
							),

							"enumerable": (
								false
							),

							"writable": (
								false
							)
						}
					)
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							(
								delegateCallback
							)
						)
					),

					(
						"$callEffect"
					),

					(
						{
							"value": (
								function callEffect(
									procedure,
									parameterList,
									result,
									scope
								){
									return	(
												(
													delegateCallback
													.$callData
													.get(
														(
															delegateCallback
														)
													)
												)
												.$effectList
												.map(
													function( effect ){
														return	(
																	effect(
																		procedure,
																		parameterList,
																		result,
																		scope
																	)
																);
													}
												)
												.pop( )
											);
								}
							),

							"configurable": (
								false
							),

							"enumerable": (
								false
							),

							"writable": (
								false
							)
						}
					)
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							(
								delegateCallback
							)
						)
					),

					(
						"$effectList"
					),

					(
						{
							"value": (
								[ ]
							),

							"configurable": (
								false
							),

							"enumerable": (
								false
							),

							"writable": (
								false
							)
						}
					)
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							(
								delegateCallback
							)
						)
					),

					(
						"$callCount"
					),

					(
						{
							"value": (
								0
							),

							"configurable": (
								false
							),

							"enumerable": (
								false
							),

							"writable": (
								true
							)
						}
					)
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							(
								delegateCallback
							)
						)
					),

					(
						"$addCallCount"
					),

					(
						{
							"value": (
								function addCallCount( ){
									(
										delegateCallback
										.$callData
										.get(
											(
												delegateCallback
											)
										)
									)
									.$callCount++;
								}
							),

							"configurable": (
								false
							),

							"enumerable": (
								false
							),

							"writable": (
								false
							)
						}
					)
				);

				Object
				.defineProperty(
					(
						delegateCallback
						.$callData
						.get(
							(
								delegateCallback
							)
						)
					),

					(
						"$checkCallCount"
					),

					(
						{
							"value": (
								function $checkCallCount( ){
									return	(
													(
														delegateCallback
														.$callData
														.get(
															(
																delegateCallback
															)
														)
													)
													.$callCount
												<	1
											);
								}
							),

							"configurable": (
								false
							),

							"enumerable": (
								false
							),

							"writable": (
								false
							)
						}
					)
				);

				(
					delegateCallback
					.$callData
					.get(
						(
							delegateCallback
						)
					)
				)
				.$effectList
				.push(
					function effect(
						procedure,
						parameterList,
						result,
						scope
					){
						if(
								(
										(
											delegateCallback
											.$callData
											.get(
												(
													delegateCallback
												)
											)
											.$checkCallCount( )
										)
									===	false
								)
						){
							const callCount = (
								delegateCallback
								.$callData
								.get(
									(
										delegateCallback
									)
								)
								.$callCount
							);

							throw	(
										new	Error(
												[
													"#callback-called-more-than-once;",

													"cannot execute callback;",
													"callback called more than once;",

													"@call-count:",
													`${ callCount };`
												]
											)
									);
						}
						else{
							delegateCallback
							.$callData
							.get(
								(
									delegateCallback
								)
							)
							.$addCallCount( );
						}

						return	(
									result
								);
					}
				);

				return	(
							delegateCallback
						);
			}
		}
		else{
			return	(
						callbackOnce(
							function callback( ){
								return	(
											undefined
										);
							}
						)
					);
		}
	}
);

module.exports = callbackOnce;
