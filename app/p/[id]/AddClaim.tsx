import { useState } from 'react';
import Button from '~/_components/Button';
import Input from '~/_components/Input';
import { $userAnnotations, $annotationLibrary, Claim, Connection } from '~/_store/data';
import { applyHighlight } from './ranges';
import { genPubId } from '~/_utils/strings';

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
			id: genPubId(),
			pubType: 'claim',
			generator: 'WikiImporter',
			title: '',
			authors: '',
			description,
			referenceId,
		};
		const prevAnnotationLibrary = $annotationLibrary.get();
		$annotationLibrary.set([...prevAnnotationLibrary, newAnnotationPub]);
		const prevAnnotations = $userAnnotations.get();
		/* Claims create a connection to the source pub, and also to a reference pub if there is one */
		/* other than the source pub (i.e. blank referenceId or referenceId === sourceId) */
		const newAnnotationConnection: Connection = {
			sourceId: sourceId,
			destinationId: newAnnotationPub.id,
			selection: {
				selectionType: 'article',
				serializedRange: serializedRange,
			},
		};
		const newAnnotationReference: Connection = {
			sourceId: newAnnotationPub.id,
			destinationId: referenceId,
		};
		if (referenceId && referenceId !== sourceId) {
			$userAnnotations.set([...prevAnnotations, newAnnotationConnection, newAnnotationReference]);
		} else {
			$userAnnotations.set([...prevAnnotations, newAnnotationConnection]);
		}
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
