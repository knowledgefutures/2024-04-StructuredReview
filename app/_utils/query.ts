import { $userLibrary } from '~/_store/data';
import { slugifyString } from './strings';

export const getPubFromSlug = (slug: string) => {
	const userLibrary = $userLibrary.get();
	return userLibrary.find((pub) => {
		return slugifyString(pub.id) === slug;
	});
};
