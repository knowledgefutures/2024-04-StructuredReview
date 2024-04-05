'use client';
import { useParams } from 'next/navigation';
import AnnotationList from './AnnotationList';
import SelectionForm from './SelectionForm';
import article from '~/_assets/article1';

export default function Pub() {
	const params = useParams<{ id: string }>();
	return (
		<div className="flex">
			<div className="w-[60%] mr-8 h-[calc(100vh-110px-32px)] sticky top-[97px] border border-slate-300 rounded-sm shadow-2xl flex-grow overflow-y-scroll">
				<div
					id="article"
					className="article p-6 font-serif text-base"
					dangerouslySetInnerHTML={{ __html: decodeURI(article) }}
				/>
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
