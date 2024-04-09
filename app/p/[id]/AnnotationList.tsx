import { useStore } from '@nanostores/react';
import {
	$userAnnotations,
	$annotationLibrary,
	isTypeArticleSelection,
	$activeAnnotationsList,
} from '~/_store/data';
import { applyHighlight } from './ranges';
import { useEffect } from 'react';
import { setTimeout } from 'timers';
import AnnotationCard from '~/_components/AnnotationCard';

export default function AnnotationList(props: { pubId: string; mode: 'blocks' | 'data' }) {
	const { pubId, mode } = props;
	const userAnnotations = useStore($userAnnotations);
	const activeAnnotations = useStore($activeAnnotationsList);
	const annotationLibrary = useStore($annotationLibrary);
	// console.log('==================');
	// console.log('AnnotationLibrary');
	// console.log(JSON.stringify(annotationLibrary));
	// console.log('userAnnotations');
	// console.log(JSON.stringify(userAnnotations));
	const localAnnotations = activeAnnotations.filter((annotation) => {
		// return pubId === annotation.sourceId || pubId === annotation.destinationId;
		return pubId === annotation.sourceId;
	});
	// useEffect(() => {
	setTimeout(() => {
		localAnnotations.forEach((annotation) => {
			if (isTypeArticleSelection(annotation.selection)) {
				applyHighlight(annotation.selection.serializedRange, annotation.color);
			}
		});
	}, 0);
	// }, []);
	return (
		<div>
			{localAnnotations.map((annotation) => {
				return (
					<AnnotationCard
						key={annotation.destinationId}
						annotation={annotation}
						mode={mode}
					/>
				);
			})}
		</div>
	);
}
