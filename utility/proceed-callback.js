"use strict";

const proceedCallback = (
	async	function proceedCallback( option, callback ){
				option = (
						option
					||	{ }
				);

				if(
						typeof
						callback
					==	"function"
				){
					return	callback(
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
);

module.exports = proceedCallback;
