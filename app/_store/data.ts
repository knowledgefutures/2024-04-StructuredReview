import { atom, type WritableAtom } from 'nanostores';
import article1 from '~/_assets/article1';
import article2 from '~/_assets/article2';
import article3 from '~/_assets/article3';
import article4 from '~/_assets/article4';
import article5 from '~/_assets/article5';
import article6 from '~/_assets/article6';

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
	color?: number;
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
		title: 'Climate change impacts on marine mammal distributions and species interactions in the North Pacific Ocean',
		authors: 'Hanna Schmidt, Liu Wen, Emily Carter',
		content: article5,
	},
	{
		id: '10.333/22871',
		pubType: 'article',
		generator: 'Article Importer Bot',
		title: 'Cellular view of balleen digestive track',
		authors: 'Hanna Schmidt, Liu Wen, Emily Carter',
		content: article6,
	},
]);
export const $externalLibrary = atom<Library>([
	{
		id: '10.214/88139',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Satellite-monitored movements of humpback whales Megaptera novaeangliae in the North Pacific Ocean',
		authors: 'Marco Bianchi, Julia Ivanov, Michael Thompson',
		content: article1,
	},
	{
		id: '10.214/28865',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Climate-driven trends in contemporary ocean productivity.',
		authors: 'Nina Kurosawa, Oliver Martinez, Aisha Khan',
		content: article1,
	},
	{
		id: '10.319/97622',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Enhanced warming of the Northwest Atlantic Ocean under climate change',
		authors: "Liam O'Brien, Sophie Dubois, Wang Lei",
		content: article1,
	},
	{
		id: '10.214/11097',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Feeding ecology of killer whales (Orcinus orca) off the Pacific Northwest',
		authors: 'Emma Clarkson, Diego Santos, Ananya Sharma',
		content: article1,
	},
	{
		id: '10.867/88261',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Insights into whale diets from stable isotope analysis',
		authors: 'James Lee, Natalia Petrova, Carlos Mendez',
		content: article1,
	},

	{
		id: '10.221/22245',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'The ecological importance of intact top-predator populations',
		authors: 'Hiroshi Tanaka, Gabriela Silva, Fatima Zahra',
		content: article1,
	},
	{
		id: '10.321/152',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Cultural change in the songs of humpback whales (Megaptera novaeangliae) from Tonga',
		authors: 'Simone Rossi, Alejandra Gutiérrez, Vikram Singh',
		content: article1,
	},
	{
		id: '10.753/98217',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Acoustic detection and long-term monitoring of a sperm whale population within a submarine canyon',
		authors: "Isabelle Mercier, Yu Chen, Mark O'Reilly",
		content: article1,
	},

	{
		id: '10.221/22246',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Impact of Warming Oceans on Whale Feeding Patterns',
		authors: 'Lucas Moreno, Sana Patel, Emily Wong',
		content: article1,
	},
	{
		id: '10.221/22247',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Krill Abundance and Its Influence on Baleen Whale Diets in Changing Seas',
		authors: 'Hiroshi Tanaka, Gabriela Silva, Fatima Zahra',
		content: article1,
	},
	{
		id: '10.221/22248',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Analyzing Shifts in Predatory Whale Diets Due to Climate Change',
		authors: 'Alexander Popov, Chloe Martin, Raj Kulkarni',
		content: article1,
	},
	{
		id: '10.221/22249',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Seasonal Diet Variations in Toothed Whales Amidst Global Warming',
		authors: "Isabelle Mercier, Yu Chen, Mark O'Reilly",
		content: article1,
	},
	{
		id: '10.221/22250',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'The Correlation Between Whale Migration Patterns and Climate-Driven Ocean Changes',
		authors: 'Simone Rossi, Alejandra Gutiérrez, Vikram Singh',
		content: article1,
	},
	{
		id: '10.221/22251',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Evaluating the Impact of Arctic Ice Melt on Whale Diet and Nutrition',
		authors: 'Marco Bianchi, Julia Ivanov, Michael Thompson',
		content: article1,
	},
	{
		id: '10.221/22252',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'The Role of Ocean Acidification in Changing Whale Food Sources',
		authors: 'Nina Kurosawa, Oliver Martinez, Aisha Khan',
		content: article1,
	},
	{
		id: '10.221/22253',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Adaptations in Whale Foraging Behavior in Response to Climate Change',
		authors: "Liam O'Brien, Sophie Dubois, Wang Lei",
		content: article1,
	},
	{
		id: '10.221/22254',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Investigating the Decline of Fish Stocks and Its Impact on Whale Diets',
		authors: 'Emma Clarkson, Diego Santos, Ananya Sharma',
		content: article1,
	},
	{
		id: '10.221/22255',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Climate Change and Its Effect on the Prey Selection of Deep Sea Whales',
		authors: 'James Lee, Natalia Petrova, Carlos Mendez',
		content: article1,
	},
	{
		id: '10.221/22256',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Temporal Variations in the Diets of Arctic Whales Correlated with Sea Ice Retreat',
		authors: "Lucas Moreno, Julia Ivanov, Mark O'Reilly",
		content: 'article12',
	},
	{
		id: '10.221/22257',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Influence of Ocean Temperature Rise on the Feeding Ecology of Sperm Whales',
		authors: 'Nina Kurosawa, Alexander Popov, Emily Wong',
		content: 'article13',
	},
	{
		id: '10.221/22258',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Predicting the Future of Whale Diets in Acidifying Oceans',
		authors: 'Hiroshi Tanaka, Diego Santos, Ananya Sharma',
		content: 'article14',
	},
	{
		id: '10.221/22259',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'The Effect of Plastic Pollution on Whale Foraging Grounds and Diet',
		authors: 'Emma Clarkson, Gabriela Silva, Fatima Zahra',
		content: 'article15',
	},
	{
		id: '10.221/22260',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Shifts in Baleen Whale Diets in Response to Ecosystem Changes',
		authors: 'Isabelle Mercier, Yu Chen, Vikram Singh',
		content: 'article16',
	},
	{
		id: '10.221/22261',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'The Impact of Overfishing on the Nutritional Strategies of Whales',
		authors: "Liam O'Brien, Sophie Dubois, Carlos Mendez",
		content: 'article17',
	},
	{
		id: '10.221/22262',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Comparative Analysis of Prey Diversity in the Diets of Toothed and Baleen Whales',
		authors: 'James Lee, Natalia Petrova, Chloe Martin',
		content: 'article18',
	},
	{
		id: '10.221/22263',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Assessing the Role of Deep-Sea Temperature Anomalies on Whale Feeding Habits',
		authors: 'Marco Bianchi, Oliver Martinez, Raj Kulkarni',
		content: 'article19',
	},
	{
		id: '10.221/22264',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Interactions Between Whale Feeding Behavior and Climate-induced Ocean Stratification',
		authors: 'Simone Rossi, Alejandra Gutiérrez, Wang Lei',
		content: 'article20',
	},
	{
		id: '10.221/22265',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'The Decline of Fish Populations and Its Cascading Effects on Whale Diet Selection',
		authors: 'Amit Patel, Fiona McAllister, Michael Thompson',
		content: 'article21',
	},
	{
		id: '10.221/22266',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Marine Heatwaves and Their Impact on the Prey Availability for Whales',
		authors: 'Sana Patel, Hiroshi Tanaka, Gabriela Silva',
		content: 'article22',
	},
	{
		id: '10.221/22267',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'The Changing Seas: Nutrient Availability and Whale Dietary Adjustments',
		authors: 'Yuto Takahashi, Sarah Jennings, Carlos Ramirez',
		content: 'article23',
	},
	{
		id: '10.221/22268',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Anthropogenic Climate Change and Its Impact on the Foraging Zones of Whales',
		authors: 'Isabel Nguyen, Mohamed Al Farsi, Lucia Vasquez',
		content: 'article24',
	},
	{
		id: '10.221/22269',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'Ecosystem Disruption: How Whales Are Adapting Their Diets to Survive',
		authors: 'Hanna Schmidt, Liu Wen, Emily Carter',
		content: 'article25',
	},
	{
		id: '10.221/22270',
		pubType: 'article',
		generator: 'Travis Rich',
		title: 'The Role of Whales in Mitigating Climate Change Through Feeding Practices',
		authors: 'Aaron Smith, Katarina Ivanova, Rajiv Chowdhury',
		content: 'article26',
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
	{
		id: '10.473/66537',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Apex Predators',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Apex_predator',
	},
	{
		id: '10.354/54453',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Food Web',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Food_web',
	},
	{
		id: '10.463/18780',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Cetacea',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Cetacea',
	},
	{
		id: '10.510/25022',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Trophic Level',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Trophic_level',
	},
	{
		id: '10.244/34101',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Baleen',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Baleen',
	},
	{
		id: '10.776/68216',
		pubType: 'claim',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		description: 'Climate change has significant implications on the distribution of whales.',
		referenceId: '10.214/88139',
	},
	{
		id: '10.490/72587',
		pubType: 'review',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		rigor: 4,
		relevance: 10,
		content:
			"While relevant, I'd like more specifics on why it is essential. This leaves the claim too open ended to suggest actionable research.",
	},
	{
		id: '10.280/55094',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Krill',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Krill',
	},
	{
		id: '10.366/26107',
		pubType: 'claim',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		description: 'Toothed whales exhibit a more diverse diet.',
		referenceId: '10.214/11097',
	},
	{
		id: '10.238/59350',
		pubType: 'claim',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		description: 'Prey abundance, distribution, and quality are impacted by climate change.',
		referenceId: '10.214/11097',
	},
	{
		id: '10.389/44670',
		pubType: 'review',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		rigor: 7,
		relevance: 6,
		content:
			'It would be helpful to have recommendations on which disciplines are involved in such interdisciplinary work. ',
	},
	{
		id: '10.389/22889',
		pubType: 'review',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		rigor: 2,
		relevance: 9,
		content: 'Stunning levels of details and precision. But it is full of typos!',
	},
	{
		id: '10.454/2248',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Ocean',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Ocean',
	},
	{
		id: '10.555/99801',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Mammal',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Mammal',
	},
	{
		id: '10.581/60106',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Echolocation',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Animal_echolocation',
	},
	{
		id: '10.361/27926',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Dolphin',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Dolphin',
	},
	{
		id: '10.670/45058',
		pubType: 'concept',
		generator: 'WikiImporter',
		title: 'Ecological Niche',
		authors: '',
		definitionUrl: 'https://en.wikipedia.org/wiki/Ecological_niche',
	},
	{
		id: '10.477/20196',
		pubType: 'review',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		rigor: 8,
		relevance: 5,
		content:
			'This is extremely well argued, but does not address the primary conclusion they are making. Greater detail and relevance would be helpful.',
	},
	{
		id: '10.296/27723',
		pubType: 'review',
		generator: 'WikiImporter',
		title: '',
		authors: '',
		rigor: 10,
		relevance: 7,
		content:
			'Precise and accurate from my understanding of review papers published since this original article was released.',
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
		destinationId: '10.214/88139',
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
	{ sourceId: '10.218/55956', destinationId: '10.214/77231' },
	{
		sourceId: '10.214/19341',
		destinationId: '10.263/62420',
		selection: { selectionType: 'article', serializedRange: '0/35/3:271,0/35/3:374' },
	},
	{ sourceId: '10.263/62420', destinationId: '10.214/22399' },
	{
		sourceId: '10.214/19341',
		destinationId: '10.601/69803',
		selection: { selectionType: 'article', serializedRange: '0/21/3:226,0/21/3:457' },
	},
	{ sourceId: '10.601/69803', destinationId: '10.214/22399' },
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
	{ sourceId: '10.214/82731', destinationId: '10.635/73552' },
	{ sourceId: '10.214/82731', destinationId: '10.354/54453' },
	{ sourceId: '10.214/82731', destinationId: '10.463/18780' },
	{ sourceId: '10.214/82731', destinationId: '10.510/25022' },
	{ sourceId: '10.214/77231', destinationId: '10.586/57533' },
	{ sourceId: '10.214/77231', destinationId: '10.214/28865' },
	{ sourceId: '10.214/77231', destinationId: '10.319/97622' },
	{ sourceId: '10.214/82731', destinationId: '10.221/22246' },
	{ sourceId: '10.214/123045', destinationId: '10.221/22247' },
	{ sourceId: '10.214/77231', destinationId: '10.221/22248' },
	{ sourceId: '10.214/82731', destinationId: '10.221/22249' },
	{ sourceId: '10.214/123045', destinationId: '10.221/22250' },
	{ sourceId: '10.214/77231', destinationId: '10.221/22251' },
	{ sourceId: '10.214/82731', destinationId: '10.221/22252' },
	{ sourceId: '10.214/123045', destinationId: '10.221/22253' },
	{ sourceId: '10.214/77231', destinationId: '10.221/22254' },
	{
		sourceId: '10.214/22399',
		destinationId: '10.581/60106',
		selection: { selectionType: 'article', serializedRange: '0/3/3:223,0/3/3:235' },
	},
	{
		sourceId: '10.214/22399',
		destinationId: '10.361/27926',
		selection: { selectionType: 'article', serializedRange: '0/7/3:76,0/7/3:84' },
	},
	{
		sourceId: '10.214/22399',
		destinationId: '10.670/45058',
		selection: { selectionType: 'article', serializedRange: '0/17/3:156,0/17/3:173' },
	},
	{
		sourceId: '10.214/22399',
		destinationId: '10.477/20196',
		selection: { selectionType: 'article', serializedRange: '0/21/3:202,0/21/3:401' },
	},
	{
		sourceId: '10.214/22399',
		destinationId: '10.296/27723',
		selection: { selectionType: 'article', serializedRange: '0/27/3:292,0/27/3:465' },
	},
]);
export const $arthurAnnotations = atom<ConnectionSource>([
	{
		sourceId: '10.214/19341',
		destinationId: '10.463/18780',
		selection: { selectionType: 'article', serializedRange: '0/9/3:31,0/9/3:38' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.510/25022',
		selection: { selectionType: 'article', serializedRange: '2/9/3:102,2/9/3:116' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.244/34101',
		selection: { selectionType: 'article', serializedRange: '6/9/3:92,6/9/3:98' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.776/68216',
		selection: { selectionType: 'article', serializedRange: '0/11/3:134,0/11/3:243' },
	},
	{ sourceId: '10.776/68216', destinationId: '10.214/22399' },
	{
		sourceId: '10.214/19341',
		destinationId: '10.490/72587',
		selection: { selectionType: 'article', serializedRange: '2/11/3:1,2/11/3:215' },
	},
	{ sourceId: '10.214/82731', destinationId: '10.221/22245' },
	{ sourceId: '10.214/82731', destinationId: '10.321/152' },
	{ sourceId: '10.214/82731', destinationId: '10.753/98217' },
	{ sourceId: '10.214/123045', destinationId: '10.321/152' },
	{
		sourceId: '10.221/22245',
		destinationId: '10.510/25022',
	},
]);
export const $professionalReviewAnotations = atom<ConnectionSource>([
	{
		sourceId: '10.214/19341',
		destinationId: '10.473/66537',
		selection: { selectionType: 'article', serializedRange: '1/3/3:5,1/3/3:19' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.354/54453',
		selection: { selectionType: 'article', serializedRange: '0/7/3:90,0/7/3:99' },
	},

	{
		sourceId: '10.214/19341',
		destinationId: '10.280/55094',
		selection: { selectionType: 'article', serializedRange: '0/15/3:86,0/15/3:91' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.214/28865',
		selection: { selectionType: 'article', serializedRange: '4/15/3:142,4/15/3:162' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.319/97622',
		selection: { selectionType: 'article', serializedRange: '8/15/3:136,8/15/3:156' },
	},
]);
export const $trustedNetworkAnnotations = atom<ConnectionSource>([
	{
		sourceId: '10.214/19341',
		destinationId: '10.366/26107',
		selection: { selectionType: 'article', serializedRange: '3/17/3:14,3/17/3:175' },
	},
	{ sourceId: '10.366/26107', destinationId: '10.214/11097' },
	{
		sourceId: '10.214/19341',
		destinationId: '10.214/11097',
		selection: { selectionType: 'article', serializedRange: '5/17/3:1,5/17/3:20' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.214/88139',
		selection: { selectionType: 'article', serializedRange: '0/19/3:174,0/19/3:194' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.867/88261',
		selection: { selectionType: 'article', serializedRange: '2/19/3:183,2/19/3:202' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.238/59350',
		selection: { selectionType: 'article', serializedRange: '0/29/3:0,0/29/3:163' },
	},
	{ sourceId: '10.238/59350', destinationId: '10.214/11097' },
	{
		sourceId: '10.214/19341',
		destinationId: '10.867/88261',
		selection: { selectionType: 'article', serializedRange: '1/29/3:328,1/29/3:348' },
	},
	{
		sourceId: '10.214/19341',
		destinationId: '10.389/44670',
		selection: { selectionType: 'article', serializedRange: '0/41/3:490,0/41/3:722' },
	},
	{ sourceId: '10.221/22251', destinationId: '10.221/22250' },
	{ sourceId: '10.221/22253', destinationId: '10.221/22251' },
	{ sourceId: '10.221/22254', destinationId: '10.221/22252' },
	{ sourceId: '10.214/19341', destinationId: '10.221/22253' },
	{ sourceId: '10.238/59350', destinationId: '10.221/22254' },
	{ sourceId: '10.221/22254', destinationId: '10.389/22889' },

	{ sourceId: '10.221/22248', destinationId: '10.454/2248' },
	{ sourceId: '10.221/22248', destinationId: '10.555/99801' },

	{ sourceId: '10.221/22248', destinationId: '10.221/22256' },
	{ sourceId: '10.221/22256', destinationId: '10.221/22257' },
	{ sourceId: '10.221/22257', destinationId: '10.221/22258' },
	{ sourceId: '10.221/22257', destinationId: '10.221/22259' },
	{ sourceId: '10.221/22255', destinationId: '10.221/22260' },
	{ sourceId: '10.221/22269', destinationId: '10.221/22261' },
	{ sourceId: '10.221/22270', destinationId: '10.221/22262' },
	{ sourceId: '10.221/22254', destinationId: '10.221/22263' },
	{ sourceId: '10.221/22254', destinationId: '10.221/22264' },
	{ sourceId: '10.221/22254', destinationId: '10.221/22265' },
	{ sourceId: '10.221/22254', destinationId: '10.221/22266' },
	{ sourceId: '10.221/22254', destinationId: '10.221/22267' },
	{ sourceId: '10.221/22255', destinationId: '10.221/22268' },
	{ sourceId: '10.221/22255', destinationId: '10.221/22269' },
	{ sourceId: '10.221/22255', destinationId: '10.221/22270' },
	{ sourceId: '10.321/152', destinationId: '10.221/22270' },

	{ sourceId: '10.221/22270', destinationId:  '10.670/45058'},
	
]);

export const $sourceList = atom<SourceList>([
	{ label: 'Your Annotations', data: $userAnnotations, active: true },
	{ label: "Arthur's Annotations", data: $arthurAnnotations, active: false },
	{ label: 'Professional Review Service', data: $professionalReviewAnotations, active: false },
	{ label: 'Open Annotation Network', data: $trustedNetworkAnnotations, active: false },
]);

export const $activeAnnotationsList = atom<ConnectionSource>([...$userAnnotations.get()]);
const handleNewSourceList = () => {
	const nextActiveAnnotations = $sourceList
		.get()
		.reduce<ConnectionSource>((prev, option, index) => {
			if (option.active) {
				const dataToAdd = option.data.get().map((item) => {
					return { color: index, ...item };
				});
				return [...prev, ...dataToAdd];
			}
			return prev;
		}, []);
	$activeAnnotationsList.set(nextActiveAnnotations);
};

$sourceList.subscribe(handleNewSourceList);
$userAnnotations.subscribe(handleNewSourceList);

export function isTypeArticle(data: any): data is Article {
	return 'pubType' in data && data.pubType === 'article';
}

export function isTypeArticleSelection(data: any): data is ArticleSelection {
	return 'selectionType' in data && data.selectionType === 'article';
}
