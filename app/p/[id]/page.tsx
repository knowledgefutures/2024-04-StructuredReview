'use client';
import { useParams } from 'next/navigation';
import AnnotationList from './AnnotationList';
import SelectionForm from './SelectionForm';
import { $userLibrary, isTypeArticle } from '~/_store/data';
import { slugifyString } from '~/_utils/strings';

export default function Pub() {
	const params = useParams<{ id: string }>();
	const userLibrary = $userLibrary.get();
	const activePub = userLibrary.find((pub) => {
		return slugifyString(pub.id) === params.id;
	});
	if (!activePub) {
		return <div>'Article Not Found'</div>;
	}
	return (
		<div className="flex">
			<div className="w-[60%] mr-8 h-[calc(100vh-110px-32px)] sticky top-[97px] border border-slate-300 rounded-sm shadow-2xl flex-grow overflow-y-scroll">
				{isTypeArticle(activePub) && (
					<div id="article" className="prose p-6 font-serif text-base">
						<h1>{activePub.title}</h1>
						<div>
							<i>By: {activePub.authors}</i>
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
			<div className="w-[40%] ">
				<div className="border-b border-slate-700 mb-8">
					<h3 className="font-bold">Selection</h3>
					<SelectionForm />
				</div>
				<div>
					<div className="flex justify-between items-center">
						<h3 className="font-bold">Annotations</h3>
						<div>
							<button>Blocks</button> · <button>Data</button>
						</div>
					</div>
					<AnnotationList mode="blocks" />
				</div>
			</div>
		</div>
	);
}
