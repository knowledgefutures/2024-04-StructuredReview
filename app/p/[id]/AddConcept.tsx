import { useStore } from '@nanostores/react';
import { useState } from 'react';
import Button from '~/_components/Button';
import Input from '~/_components/Input';
import { $userAnnotations, $annotationLibrary, Concept, Connection } from '~/_store/data';

type Props = {
	clearSelection: () => void;
};
export default function AddConcept({ clearSelection }: Props) {
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');

	const handleAdd = () => {
		// Add to annotation library
		const newAnnotationPub: Concept = {
			id: '10.222/444',
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
			sourceId: 'abc',
			destinationId: 'def',
		};
		$userAnnotations.set([...prevAnnotations, newAnnotationConnection]);
		setName('');
		setUrl('');
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
