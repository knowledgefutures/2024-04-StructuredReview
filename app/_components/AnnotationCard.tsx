// --@ts-nocheck

import { useStore } from '@nanostores/react';
import { $annotationLibrary, $userLibrary, Pub, type Connection } from '~/_store/data';
import { scrollToAnnotation } from '~/p/[id]/ranges';

export default function AnnotationCard(props: { annotation: Connection; mode: 'blocks' | 'data' }) {
	const { annotation, mode } = props;
	const annotationLibrary = useStore($annotationLibrary);
	const userLibrary = useStore($userLibrary);
	const destinationPub: Pub | undefined = [...userLibrary, ...annotationLibrary].find(
		(destannote) => {
			return destannote.id === annotation.destinationId;
		}
	);
	if (!destinationPub) {
		console.log('Cant find one!');
		return null;
	}
	return (
		<div className="border border-zinc-800 my-4 rounded-sm p-2 font-sans text-sm">
			{mode === 'blocks' && (
				<>
					<span className="capitalize text-sm font-mono flex justify-between items-center opacity-50">
						<div>
							{destinationPub.pubType === 'article'
								? 'reference'
								: destinationPub.pubType}
						</div>
						{annotation.selection && (
							<button
								onClick={() => {
									scrollToAnnotation(annotation.selection.serializedRange);
								}}
							>
								Go to selection
							</button>
						)}
					</span>
					{destinationPub.title && (
						<div className="font-bold">{destinationPub.title}</div>
					)}
					{destinationPub.authors && <div>{destinationPub.authors}</div>}
					{destinationPub.definitionUrl && (
						<div>
							<a href={destinationPub.definitionUrl}>
								{destinationPub.definitionUrl}
							</a>
						</div>
					)}
					{destinationPub.description && <div>{destinationPub.description}</div>}
					{destinationPub.referenceId && (
						<div>Reference source: {destinationPub.referenceId}</div>
					)}
					{destinationPub.rigor && <div>Rigor: {destinationPub.rigor}</div>}
					{destinationPub.relevance && <div>Relevance: {destinationPub.relevance}</div>}
					{destinationPub.validates && (
						<div>Validates: {destinationPub.validates ? 'True' : 'False'}</div>
					)}
					{['review', 'replication'].includes(destinationPub.pubType) &&
						destinationPub.content && <div>{destinationPub.content}</div>}
				</>
			)}
			{mode === 'data' && (
				<pre className="overflow-scroll">
					{JSON.stringify({ ...annotation, destinationPub }, null, 2)}
				</pre>
			)}
		</div>
	);
}
