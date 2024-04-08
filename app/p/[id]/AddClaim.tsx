import { useState } from 'react';
import Button from '~/_components/Button';
import Input from '~/_components/Input';
import { $userAnnotations, $annotationLibrary, Claim, Connection } from '~/_store/data';
import { applyHighlight } from './ranges';

type Props = {
	sourceId: string;
	clearSelection: () => void;
	serializedRange: string;
};
export default function AddClaim({ sourceId, clearSelection, serializedRange }: Props) {
	const [description, setDescription] = useState('');
	const [referenceId, setReferenceId] = useState('');
	const handleAdd = () => {
		const newAnnotationPub: Claim = {
			id: '10.222/444',
			pubType: 'concept',
			generator: 'WikiImporter',
			title: '',
			authors: '',
			description,
			referenceId,
		};
		const prevAnnotationLibrary = $annotationLibrary.get();
		$annotationLibrary.set([...prevAnnotationLibrary, newAnnotationPub]);
		const prevAnnotations = $userAnnotations.get();
		const newAnnotationConnection: Connection = {
			sourceId: sourceId,
			destinationId: 'def',
			selection: {
				selectionType: 'article',
				serializedRange: serializedRange,
			},
		};
		$userAnnotations.set([...prevAnnotations, newAnnotationConnection]);
		setDescription('');
		setReferenceId('');
		applyHighlight(serializedRange);
		clearSelection();
	};

	return (
		<form>
			<Input
				label={'Description'}
				value={description}
				onChange={(evt) => {
					setDescription(evt.target.value);
				}}
				placeholder="Alpha particles do not demonstrate rotational symmetry."
			/>
			<Input
				label={'Reference ID'}
				value={referenceId}
				onChange={(evt) => {
					setReferenceId(evt.target.value);
				}}
				placeholder="doi: 10.213...."
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
