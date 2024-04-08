import { useRef, useState } from 'react';
import useArticleSelection from './useArticleSelection';
import AddConcept from './AddConcept';

export default function SelectionForm() {
	const selectionRef = useRef<HTMLDivElement | null>(null);
	const [formActive, setFormActive] = useState(false);
	const [inputMode, setInputMode] = useState<string | undefined>(undefined);
	const selectionInnerH = useArticleSelection(selectionRef, formActive);
	const modeButtonClasses = 'underline underline-offset-4 decoration-2';
	const modes = ['concept', 'reference', 'review', 'replication'];
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
					className="bg-white shadow-xl border border-slate-300 article p-2 font-serif text-base overflow-x-hidden w-[150%] scale-[.66] origin-top-left"
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
			{inputMode === 'concept' && <AddConcept clearSelection={clearSelection} />}
		</div>
	);
}
