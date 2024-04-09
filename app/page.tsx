'use client';
import { useStore } from '@nanostores/react';
import { useSearchParams } from 'next/navigation'
import { $userLibrary, /* $userAnnotations, */ $activeAnnotationsList } from '~/_store/data';
import PubCard from '~/_components/PubCard';

export default function Home() {
	const library = useStore($userLibrary);
	const activeAnnotations = useStore($activeAnnotationsList);
	const searchParams = useSearchParams()
	const focus = searchParams.get('focus')
	return (
		<div>
			<div className="max-w-xl">
				<div className="flex justify-between items-center mb-8">
					<h2 className="font-bold text-lg">Your Library</h2>
					<input
						className="border border-slate-800 text-sm px-1 py-[2px] outline-none"
						type="text"
						placeholder="Add by DOI"
					/>
				</div>

				{library.map((pub) => {
					return (
						<PubCard
							key={pub.id}
							id={pub.id}
							title={pub.title}
							authors={pub.authors}
							connections={activeAnnotations.filter((annotation) => {
								return (
									pub.id === annotation.sourceId ||
									pub.id === annotation.destinationId
								);
							})}
						/>
					);
				})}
			</div>
		</div>
	);
}
