'use client';

import Image from 'next/image';
import kfDoc from '~/_assets/kfDoc.svg';
import { Popover, PopoverContent, PopoverTrigger } from '~/_components/Popover';
import SourceList from './SourceList';

export default function Header() {
	return (
		<nav className="sticky top-0 border-b border-slate-800 px-8 py-3 font-mono mb-12 bg-white z-10">
			<a
				className="absolute left-2 top-[10px] "
				href="https://www.knowledgefutures.org/rd/ds001"
			>
				<Image src={kfDoc} width={24} height={24} alt="KF Demo Documentation" />
			</a>
			<div className="max-w-screen-xl m-auto flex justify-between">
				<h1>
					<a href="/">Structured Review Demo</a>
				</h1>
				<div className="flex">
					<Popover>
						<PopoverTrigger>Sources</PopoverTrigger>
						<PopoverContent>
							<SourceList />
						</PopoverContent>
					</Popover>

					<div className="rounded-full bg-slate-300 ml-2 h-6 w-6" />
				</div>
			</div>
		</nav>
	);
}
