import { atom } from 'nanostores';
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
export type Reference = PubBase & {
	referenceId: string;
};
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

export type Pub = Article | PDF | Video | Concept | Reference | Review | Replication;
export type Library = Array<Pub>;
export type ConnectionSource = Array<Connection>;
export type SourceList = Array<{ label: string; source: ConnectionSource; active: boolean }>;

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
]);

export const $userAnnotations = atom<ConnectionSource>([
	{ sourceId: '10.214/19341', destinationId: '10.222/1324' },
]);
export const $arthurAnnotations = atom<ConnectionSource>([
	{ sourceId: '10.214/19341', destinationId: '10.222/1324' },
]);

export const $sourceList = atom<SourceList>([
	{ label: 'My Annotations', source: $userAnnotations.get(), active: true },
	{ label: "Arthur Wescott's Annotations", source: $arthurAnnotations.get(), active: false },
	{ label: 'MITP Annotations', source: [], active: false },
]);

export function isTypeArticle(data: any): data is Article {
	return 'pubType' in data && data.pubType === 'article';
}
