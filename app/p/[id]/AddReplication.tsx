import { useState } from 'react';
import Button from '~/_components/Button';
import Input from '~/_components/Input';
import {
	$userAnnotations,
	$annotationLibrary,
	Connection,
	Review,
	Replication,
} from '~/_store/data';
import { applyHighlight } from './ranges';
import Textarea from '~/_components/Textarea';

type Props = {
	sourceId: string;
	clearSelection: () => void;
	serializedRange: string;
};
export default function AddReplication({ sourceId, clearSelection, serializedRange }: Props) {
	const [validates, setValidates] = useState('');
	console.log('validates',validates)
	const [referenceId, setReferenceId] = useState('');
	const [content, setContent] = useState('');
	const handleAdd = () => {
		const newAnnotationPub: Replication = {
			id: '10.222/444',
			pubType: 'concept',
			generator: 'WikiImporter',
			title: '',
			authors: '',
			validates: validates === 'true',
			referenceId,
			content,
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
		setValidates('');
		setReferenceId('');
		setContent('');
		setContent('');
		applyHighlight(serializedRange);
		clearSelection();
	};

	return (
		<form>
			<Input
				label={'Validates'}
				value={validates}
				onChange={() => {
					setValidates(validates ? '' : 'true');
				}}
				type="checkbox"
			/>
			<Input
				label={'Reference ID'}
				value={referenceId}
				onChange={(evt) => {
					setReferenceId(evt.target.value);
				}}
				placeholder="doi: 10.213...."
			/>
			<Textarea
				label="Notes"
				value={content}
				onChange={(evt) => {
					setContent(evt.target.value);
				}}
				placeholder="Your replication notes"
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
