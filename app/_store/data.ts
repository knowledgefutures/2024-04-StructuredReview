import { atom, type WritableAtom } from 'nanostores';
import article1 from '~/_assets/article1';
import article2 from '~/_assets/article2';
import article3 from '~/_assets/article3';
import article4 from '~/_assets/article4';
import article5 from '~/_assets/article5';

type PubBase = {
	id: string;
	pubType: string;
	generator: string;
	title: string;
	authors: string;
};
export type ArticleSelection = {
	selectionType: string;
	serializedRange: string;
};
export type MovieSelection = {
	selectionType: string;
	startSeconds: number;
	stopSeconds: number;
};
export type Selection = ArticleSelection | MovieSelection;

export type Connection = {
	sourceId: string;
	destinationId: string;
	selection?: Selection;
};

export type Article = PubBase & {
	content: Object;
};
export type PDF = PubBase & {
	file: string;
};
export type Video = PubBase & {
	file: string;
};
export type Concept = PubBase & {
	definitionUrl: string;
};
export type Claim = PubBase & {
	description: string;
	referenceId: string;
};
// export type Reference = PubBase & {
// 	referenceId: string;
// };
export type Review = PubBase & {
	rigor: number;
	relevance: number;
	content: string;
};
export type Replication = PubBase & {
	validates: boolean;
	referenceId: string;
	content: Object;
};

export type Pub = Article | PDF | Video | Concept | Claim | /* Reference | */ Review | Replication;
export type Library = Array<Pub>;
export type ConnectionSource = Array<Connection>;
export type SourceList = Array<{
	label: string;
	data: WritableAtom<ConnectionSource>;
	active: boolean;
}>;

/* 
We have the user's default Library. 
We have an Library of all the available pubs that the user doesn't have in their library that we use in the search bar.

Annotations are all either selecting or creating&selecting a pub, and creating a connection object between the two of them. 
ConnectionSources are different lists of connections.
For the demo, we simply hold all annotations in conection stores, and iterate over all 
the active sources to render connection counts, annotations, etc
*/

export const $userLibrary = atom<Library>([
	{
		id: '10.214/19341',
		pubType: 'article',
		generator: 'Article Importer Bot',
		title: 'Effects of climate change on prey availability for whales',
		authors: 'Ethel Black, Birgin Croll, and G.J. Bowen',
		content: article1,
	},
	{
		id: '10.214/22399',
		pubType: 'article',
		generator: 'Article Importer Bot',
		title: 'Foraging behavior of toothed whales',
		authors: 'Benny Jones and Alicia Xu',
		content: article2,
	},
	{
		id: '10.214/82731',
		pubType: 'article',
		generator: 'Article Importer Bot',
		title: 'Electronic tagging and population structure of large oceanic predators',
		authors: 'Yuto Takahashi, Sarah Jennings, Carlos Ramirez',
		content: article3,
	},
	{
		id: '10.214/123045',
		pubType: 'article',
		generator: 'Article Importer Bot',
		title: 'Tracing marine mammal diets using stable isotopes: a review with case studies',
		authors: 'Isabel Nguyen, Mohamed Al Farsi, Lucia Vasquez',
		content: article4,
	},
	{
		id: '10.214/77231',
		pubType: 'article',
		generator: 'Article Importer Bot',
		title: ' Enhanced warming of the Northwest Atlantic Ocean under climate change',
		authors: 'Hanna Schmidt, Liu Wen, Emily Carter',
		content: article5,
	},
]);
export const $externalLibrary = atom<Library>([
	{
		id: '10.214/4444',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'This is an external article',
		authors: 'Didi Wisconsin',
		content: article1,
	},
]);
/* These are pubs created via annotations */
export const $annotationLibrary = atom<Library>([
	{
		id: '10.222/1324',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Physics',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Physics',
	},
	{
		id: '10.586/57533',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Whales',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Whale',
	},
	{
		id: '10.303/80485',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Marine Ecosystem',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Marine_ecosystem',
	},
	{
		id: '10.287/85952',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Climate Change',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Climate_change',
	},
	{
		id: '10.597/86229',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Plankton',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Plankton',
	},
	{
		id: '10.507/19976',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Isotope Analysis',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Isotope_analysis',
	},
	{
		id: '10.258/19513',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Squid',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Squid',
	},
	{
		id: '10.218/55956',
		pubType: 'claim',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		description: 'Time and magnitude of plankton shifts altered due to climate change.',
		referenceId: '10.214/77231',
	},
	{
		id: '10.263/62420',
		pubType: 'claim',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		description: 'Prey species locations altered due to climate shifts.',
		referenceId: '10.214/22399',
	},
	{
		id: '10.601/69803',
		pubType: 'claim',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		description: 'Isotope analysis shows altered prey composition in whale diets.',
		referenceId: '10.214/22399',
	},
	{
		id: '10.359/11828',
		pubType: 'review',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		rigor: 5,
		relevance: 10,
		content:
			'This omits a critical element of baleen whale filtering which is their seasonal switch between prey species.',
	},
	{
		id: '10.635/73552',
		pubType: 'replication',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		validates: true,
		referenceId: '10.214/77231',
		content:
			'Carter et al. use a similar technique and have shown it to be experimentally valid.',
	},
]);

export const $userAnnotations = atom<ConnectionSource>([
	{
		sourceId: '10.214/19341',
		destinationId: '10.586/57533',
		selection: { selectionType: 'article', serializedRange: '0/3/3:0,0/3/3:6' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.303/80485',
		selection: { selectionType: 'article', serializedRange: '1/3/3:23,1/3/3:39' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.287/85952',
		selection: { selectionType: 'article', serializedRange: '3/3/3:116,3/3/3:130' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.597/86229',
		selection: { selectionType: 'article', serializedRange: '0/9/3:395,0/9/3:415' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.507/19976',
		selection: { selectionType: 'article', serializedRange: '0/15/3:306,0/15/3:322' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.258/19513',
		selection: { selectionType: 'article', serializedRange: '2/9/3:38,2/9/3:43' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.214/22399',
		selection: { selectionType: 'article', serializedRange: '0/9/3:256,0/9/3:276' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.214/82731',
		selection: { selectionType: 'article', serializedRange: '6/9/3:29,6/9/3:49' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.214/123045',
		selection: { selectionType: 'article', serializedRange: '0/15/3:115,0/15/3:135' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.214/77231',
		selection: { selectionType: 'article', serializedRange: '0/17/3:421,0/17/3:441' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.218/55956',
		selection: { selectionType: 'article', serializedRange: '0/33/3:0,0/33/3:180' },
	},
	{
		sourceId: '10.218/55956',
		destinationId: '10.214/77231',
	},

	{
		sourceId: '10.214/19341',
		destinationId: '10.263/62420',
		selection: { selectionType: 'article', serializedRange: '0/35/3:271,0/35/3:374' },
	},
	{
		sourceId: '10.263/62420',
		destinationId: '10.214/22399',
	},

	{
		sourceId: '10.214/19341',
		destinationId: '10.601/69803',
		selection: { selectionType: 'article', serializedRange: '0/21/3:226,0/21/3:457' },
	},
	{
		sourceId: '10.601/69803',
		destinationId: '10.214/22399',
	},

	{
		sourceId: '10.214/19341',
		destinationId: '10.359/11828',
		selection: { selectionType: 'article', serializedRange: '0/17/3:0,0/17/3:262' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.635/73552',
		selection: { selectionType: 'article', serializedRange: '0/21/3:13,0/21/3:202' },
	},
]);
export const $arthurAnnotations = atom<ConnectionSource>([
	{
		sourceId: '10.214/19341',
		destinationId: '10.359/11828',
		selection: { selectionType: 'article', serializedRange: '0/17/3:0,0/17/3:262' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.635/73552',
		selection: { selectionType: 'article', serializedRange: '0/21/3:13,0/21/3:202' },
	},
]);
export const $professionalReviewAnotations = atom<ConnectionSource>([]);
export const $trustedNetworkAnnotations = atom<ConnectionSource>([]);

export const $sourceList = atom<SourceList>([
	{ label: 'Your Annotations', data: $userAnnotations, active: true },
	{ label: "Arthur's Annotations", data: $arthurAnnotations, active: false },
	{ label: 'Professional Review Service', data: $professionalReviewAnotations, active: false },
	{ label: 'Open Annotation Network', data: $trustedNetworkAnnotations, active: false },
]);

export const $activeAnnotationsList = atom<ConnectionSource>([...$userAnnotations.get()]);

export function isTypeArticle(data: any): data is Article {
	return 'pubType' in data && data.pubType === 'article';
}

export function isTypeArticleSelection(data: any): data is ArticleSelection {
	return 'selectionType' in data && data.selectionType === 'article';
}
