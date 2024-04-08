import { useStore } from '@nanostores/react';
import { $userAnnotations, $annotationLibrary, Concept, Connection } from '~/_store/data';

export default function AnnotationList(props: { mode: 'blocks' | 'data' }) {
	const { mode } = props;
	const userAnnotations = useStore($userAnnotations);
	return (
		<div>
			{userAnnotations.map((annotation) => {
				return (
					<div key={annotation.destinationId} className="border border-zinc-800">
						{annotation.sourceId}
					</div>
				);
			})}
		</div>
	);
}
