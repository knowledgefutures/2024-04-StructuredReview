import { useState } from 'react';
import Button from '~/_components/Button';
import Input from '~/_components/Input';
import { $userAnnotations, $annotationLibrary, Connection, Review } from '~/_store/data';
import { applyHighlight } from './ranges';
import Textarea from '~/_components/Textarea';

type Props = {
	sourceId: string;
	clearSelection: () => void;
	serializedRange: string;
};
export default function AddReview({ sourceId, clearSelection, serializedRange }: Props) {
	const [rigor, setRigor] = useState(0);
	const [relevance, setRelevance] = useState(0);
	const [content, setContent] = useState('');
	const handleAdd = () => {
		const newAnnotationPub: Review = {
			id: '10.222/444',
			pubType: 'concept',
			generator: 'WikiImporter',
			title: '',
			authors: '',
			rigor,
			relevance,
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
		setRigor(0);
		setRelevance(0);
		setContent('');
		applyHighlight(serializedRange);
		clearSelection();
	};

	return (
		<form>
			<Input
				label={'Rigor'}
				value={rigor}
				onChange={(evt) => {
					setRigor(Math.min(10, Math.max(0, evt.target.value)));
				}}
				type="number"
				min={0}
				max={10}
			/>
			<Input
				label={'Relevance'}
				value={relevance}
				onChange={(evt) => {
					setRigor(Math.min(10, Math.max(0, evt.target.value)));
				}}
				type="number"
				min={0}
				max={10}
			/>
			<Textarea
				label="Review Notes"
				value={content}
				onChange={(evt) => {
					setContent(evt.target.value);
				}}
				placeholder="Your review notes"
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
