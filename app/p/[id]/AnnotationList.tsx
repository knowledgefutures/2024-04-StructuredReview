import { useStore } from '@nanostores/react';
import { $userAnnotations, $annotationLibrary, isTypeArticleSelection } from '~/_store/data';
import { applyHighlight, canDeserialize } from './ranges';
import { useEffect } from 'react';
import { setTimeout } from 'timers';

export default function AnnotationList(props: { pubId: string; mode: 'blocks' | 'data' }) {
	const { pubId, mode } = props;
	const userAnnotations = useStore($userAnnotations);
	const annotationLibrary = useStore($annotationLibrary);
	console.log('==================');
	console.log('AnnotaitonLibrary');
	console.log(JSON.stringify(annotationLibrary));
	console.log('userAnnotations');
	console.log(JSON.stringify(userAnnotations));
	const localAnnotations = userAnnotations.filter((annotation) => {
		return pubId === annotation.sourceId || pubId === annotation.destinationId;
	});
	useEffect(() => {
		setTimeout(() => {
			localAnnotations.forEach((annotation) => {
				if (isTypeArticleSelection(annotation.selection)) {
					applyHighlight(annotation.selection.serializedRange);
				}
			});
		}, 0);
	}, []);

	return (
		<div>
			{localAnnotations.map((annotation) => {
				return (
					<div key={annotation.destinationId} className="border border-zinc-800">
						{annotation.sourceId}
					</div>
				);
			})}
		</div>
	);
}
