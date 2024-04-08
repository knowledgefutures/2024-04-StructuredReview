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

export const genPubId = () => {
	const prefix = Math.floor(Math.random() * (798 - 198 + 1)) + 198;
	const suffix = Math.floor(Math.random() * (89999 - 10011 + 1)) + 10011;
	return `10.${prefix}/${suffix}`;
};
