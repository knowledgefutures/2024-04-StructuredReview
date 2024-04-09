'use client';
import { useParams } from 'next/navigation';
import AnnotationList from './AnnotationList';
import SelectionForm from './SelectionForm';
import { $activeAnnotationsList, isTypeArticle } from '~/_store/data';
import { getPubFromSlug } from '~/_utils/query';
import { useState } from 'react';
import { useStore } from '@nanostores/react';

export default function Pub() {
	const [annotationMode, setAnnotationMode] = useState<'blocks' | 'data'>('blocks');
	const activeAnnotationsList = useStore($activeAnnotationsList);
	const params = useParams<{ id: string }>();
	const activePub = getPubFromSlug(params.id);
	if (!activePub) {
		return <div>'Article Not Found'</div>;
	}
	const modeButtonClasses = 'underline underline-offset-4 decoration-2';
	return (
		<div className="flex">
			<div className="w-[60%] mr-8 h-[calc(100vh-110px-32px)] sticky top-[97px] border border-slate-300 rounded-sm shadow-2xl flex-grow overflow-y-scroll scroll-smooth">
				{isTypeArticle(activePub) && (
					<div id="article" className="prose p-6 font-serif text-base">
						<h1>{activePub.title}</h1>
						<div>
							<i>{activePub.authors}</i>
						</div>
						<div className="font-mono text-md opacity-60">{activePub.id}</div>
						<div
							dangerouslySetInnerHTML={{
								__html: decodeURI(activePub.content as string),
							}}
						/>
					</div>
				)}
			</div>
			<div className="w-[40%] flex-grow-0 flex-shrink-0">
				<div className="border-b border-slate-700 mb-8">
					<h3 className="font-bold">Selection</h3>
					<SelectionForm />
				</div>
				<div>
					<div className="flex justify-between items-center">
						<h3 className="font-bold">Annotations <span className="opacity-50">({activeAnnotationsList.length})</span></h3>
						<div className="text-sm flex space-x-4">
							<button
								className={annotationMode === 'blocks' ? modeButtonClasses : ''}
								onClick={() => {
									setAnnotationMode('blocks');
								}}
							>
								Blocks
							</button>
							<span>·</span>
							<button
								className={annotationMode === 'data' ? modeButtonClasses : ''}
								onClick={() => {
									setAnnotationMode('data');
								}}
							>
								Data
							</button>
						</div>
					</div>
					<AnnotationList pubId={activePub.id} mode={annotationMode} />
				</div>
			</div>
		</div>
	);
}
