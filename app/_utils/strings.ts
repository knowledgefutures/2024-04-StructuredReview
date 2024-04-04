export const slugifyString = (input: string) => {
	if (typeof input !== 'string') {
		console.error('input is not a valid string');
		return '';
	}

	return input
		.replace(/ /g, '-')
		.replace(/\//g, '-')
		.replace(/\./g, '-')
		.replace(/[^a-zA-Z0-9-]/gi, '')
		.toLowerCase();
};
