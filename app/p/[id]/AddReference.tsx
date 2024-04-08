import { useState } from 'react';
import Button from '~/_components/Button';
import Input from '~/_components/Input';
import { $userAnnotations, $annotationLibrary, Concept, Connection, /* Reference */ } from '~/_store/data';
import { applyHighlight } from './ranges';
import { genPubId } from '~/_utils/strings';

type Props = {
	sourceId: string;
	clearSelection: () => void;
	serializedRange: string;
};
export default function AddReference({ sourceId, clearSelection, serializedRange }: Props) {
	const [referenceId, setReferenceId] = useState('');
	const handleAdd = () => {
		// const newAnnotationPub: Reference = {
		// 	id: genPubId(),
		// 	pubType: 'reference',
		// 	generator: 'WikiImporter',
		// 	title: '',
		// 	authors: '',
		// 	referenceId: referenceId,
		// };
		// const prevAnnotationLibrary = $annotationLibrary.get();
		// $annotationLibrary.set([...prevAnnotationLibrary, newAnnotationPub]);
		const prevAnnotations = $userAnnotations.get();
		const newAnnotationConnection: Connection = {
			sourceId: sourceId,
			destinationId: referenceId,
			selection: {
				selectionType: 'article',
				serializedRange: serializedRange,
			},
		};
		$userAnnotations.set([...prevAnnotations, newAnnotationConnection]);
		setReferenceId('');
		applyHighlight(serializedRange);
		clearSelection();
	};

	return (
		<form>
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
