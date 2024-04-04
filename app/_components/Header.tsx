'use client';

import Image from 'next/image';
import kfDoc from '~/_assets/kfDoc.svg';

export default function Header() {
	return (
		<nav className="sticky top-0 border-b border-slate-800 px-8 py-3 font-mono mb-12 bg-white">
			<a
				className="absolute left-2 top-[10px] "
				href="https://rd.knowledgefutures.org/ds/001"
			>
				<Image src={kfDoc} width={24} height={24} alt="KF Demo Documentation" />
			</a>
			<div className="max-w-screen-lg m-auto flex justify-between">
				<h1>
					<a href="/">Structured Review Demo</a>
				</h1>
				<div className="flex">
					<div>Sources</div>
					<div className="rounded-full bg-slate-300 ml-2 h-6 w-6" />
				</div>
			</div>
		</nav>
	);
}
