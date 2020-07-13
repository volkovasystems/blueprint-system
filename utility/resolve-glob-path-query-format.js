"use strict";

const PARTITION_VOLUME_PATTERN = (
	/^[A-Za-z]\:/
);

const WINDOW_PLATFORM_SEPARATOR_PATTERN = (
	/\\/g
);

const resolveGlobPathQueryFormat = (
	function resolveGlobPathQueryFormat( path ){
		return	(
					path
					.replace(
						PARTITION_VOLUME_PATTERN,
						""
					)
					.replace(
						WINDOW_PLATFORM_SEPARATOR_PATTERN,
						"/"
					)
				);
	}
);

module.exports = resolveGlobPathQueryFormat;
