import { useRef, useState } from 'react';
import useArticleSelection from './useArticleSelection';

export default function SelectionForm() {
	const selectionRef = useRef<HTMLDivElement | null>(null);
	const [formActive, setFormActive] = useState(false);
	const selectionInnerH = useArticleSelection(selectionRef, formActive);
	const [inputMode, setInputMode] = useState<string | undefined>(undefined);
	return (
		<div>
			<div
				ref={selectionRef}
				className="bg-white shadow-xl border border-slate-300 article p-2 font-serif text-base overflow-x-hidden w-[150%] scale-[.66] origin-top-left"
			/>
			{(selectionInnerH || formActive) && (
				<div className="text-sm flex space-x-4">
					<button
						onClick={() => {
							setInputMode('concept');
							setFormActive(true);
						}}
					>
						Concept
					</button>
					<button onClick={() => setInputMode('Reference')}>Reference</button>
					<button onClick={() => setInputMode('Review')}>Review</button>
					<button onClick={() => setInputMode('Replication')}>Replication</button>
				</div>
			)}
			{inputMode === 'concept' && (
				<>
					<input type="text" />
				</>
			)}
		</div>
	);
}
