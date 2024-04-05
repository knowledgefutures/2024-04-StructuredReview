import { atom } from 'nanostores';
import article1 from '~/_assets/article1';

type PubBase = {
	id: string;
	pubType: string;
	generator: string;
	title: string;
	authors: string;
};
export type ArticleSelection = {
	selectionType: string;
	source: string;
	start: string;
	stop: string;
	text: string;
};
export type MovieSelection = {
	selectionType: string;
	source: string;
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
export type Reference = PubBase & {
	referenceUrl: string;
};
export type Review = PubBase & {
	rigor: number;
	relevance: number;
	content: Object;
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
		generator: 'Travis Rich',
		title: 'A first article here',
		authors: 'Mark Ruffalo and Dash Wescott',
		content: article1,
	},
	{
		id: '10.214/22399',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'A second article here',
		authors: 'Dana Newburg and Artermis Lifton',
		content: article1,
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
])

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
