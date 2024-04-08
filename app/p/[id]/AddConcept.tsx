import { useState } from 'react';
import Button from '~/_components/Button';
import Input from '~/_components/Input';
import { $userAnnotations, $annotationLibrary, Concept, Connection } from '~/_store/data';
import { applyHighlight } from './ranges';
import { genPubId } from '~/_utils/strings';

type Props = {
	sourceId: string;
	clearSelection: () => void;
	serializedRange: string;
};
export default function AddConcept({ sourceId, clearSelection, serializedRange }: Props) {
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const handleAdd = () => {
		const newAnnotationPub: Concept = {
			id: genPubId(),
			pubType: 'concept',
			generator: 'WikiImporter',
			title: name,
			authors: '',
			definitionUrl: url,
		};
		const prevAnnotationLibrary = $annotationLibrary.get();
		$annotationLibrary.set([...prevAnnotationLibrary, newAnnotationPub]);
		const prevAnnotations = $userAnnotations.get();
		const newAnnotationConnection: Connection = {
			sourceId: sourceId,
			destinationId: newAnnotationPub.id,
			selection: {
				selectionType: 'article',
				serializedRange: serializedRange,
			},
		};
		$userAnnotations.set([...prevAnnotations, newAnnotationConnection]);
		setName('');
		setUrl('');
		applyHighlight(serializedRange);
		clearSelection();
	};

	return (
		<form>
			<Input
				label={'Concept Name'}
				value={name}
				onChange={(evt) => {
					setName(evt.target.value);
				}}
				placeholder="Particle physics"
			/>
			<Input
				label={'Definition URL'}
				value={url}
				onChange={(evt) => {
					setUrl(evt.target.value);
				}}
				placeholder="https://en.wikipedia.org/..."
			/>
			<div className="flex items-center space-x-4">
				<Button text="Add Annotation" onClick={handleAdd} />
				<button className="opacity-50" onClick={clearSelection}>
					Cancel
				</button>
			</div>
		</form>
	);
}
