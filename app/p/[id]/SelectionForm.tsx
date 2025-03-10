import { useRef, useState } from 'react';
import useArticleSelection from './useArticleSelection';
import AddConcept from './AddConcept';
import { useParams } from 'next/navigation';
import AddReference from './AddReference';
import AddClaim from './AddClaim';
import AddReview from './AddReview';
import AddReplication from './AddReplication';
import { getPubFromSlug } from '~/_utils/query';

export default function SelectionForm() {
	const params = useParams<{ id: string }>();
	const activePub = getPubFromSlug(params.id);
	if (!activePub) {
		return null;
	}
	const selectionRef = useRef<HTMLDivElement | null>(null);
	const [formActive, setFormActive] = useState(false);
	const [inputMode, setInputMode] = useState<string | undefined>(undefined);
	const [selectionInnerH, serializedRange] = useArticleSelection(selectionRef, formActive);
	const modeButtonClasses = 'underline underline-offset-4 decoration-2';
	const modes = ['reference', 'concept', 'claim', 'review', 'replication'];
	const clearSelection = () => {
		setFormActive(false);
		setInputMode(undefined);
	};
	const showSelection = selectionInnerH || formActive;
	return (
		<div className="mb-8">
			<div className={showSelection ? 'hidden' : 'block'}>
				<div className="opacity-50 text-center border border-dashed border-zinc-800 py-1 text-sm">
					No Selection
				</div>
			</div>
			<div className={showSelection ? 'block' : 'hidden'}>
				<div
					ref={selectionRef}
					className="prose max-w-[150%] bg-white shadow-xl border border-slate-300 p-2 font-serif text-base overflow-x-hidden w-[150%] scale-[.66] origin-top-left"
				/>
			</div>
			{showSelection && (
				<div className="text-sm flex space-x-4">
					{modes.map((mode) => {
						return (
							<button
								key={mode}
								className={inputMode === mode ? modeButtonClasses : ''}
								onClick={() => {
									setInputMode(mode);
									setFormActive(true);
								}}
							>
								<span className="capitalize">{mode}</span>
							</button>
						);
					})}
				</div>
			)}
			{inputMode === 'reference' && (
				<AddReference
					sourceId={activePub.id}
					clearSelection={clearSelection}
					serializedRange={serializedRange}
				/>
			)}
			{inputMode === 'concept' && (
				<AddConcept
					sourceId={activePub.id}
					clearSelection={clearSelection}
					serializedRange={serializedRange}
				/>
			)}
			{inputMode === 'claim' && (
				<AddClaim
					sourceId={activePub.id}
					clearSelection={clearSelection}
					serializedRange={serializedRange}
				/>
			)}
			{inputMode === 'review' && (
				<AddReview
					sourceId={activePub.id}
					clearSelection={clearSelection}
					serializedRange={serializedRange}
				/>
			)}
			{inputMode === 'replication' && (
				<AddReplication
					sourceId={activePub.id}
					clearSelection={clearSelection}
					serializedRange={serializedRange}
				/>
			)}
		</div>
	);
}
