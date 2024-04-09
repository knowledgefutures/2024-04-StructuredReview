import Link from 'next/link';
import linkIcon from '~/_assets/link.svg';
import type { Pub } from '~/_store/data';
import { slugifyString } from '~/_utils/strings';

export default function PubCard(props: Partial<Pub> & { connections: Array<any> }) {
	const { id = '', title, authors, connections } = props;
	return (
		<div className="flex items-center border border-slate-600 rounded mt-4 mb-4 font-sans">
			<Link className="flex-auto no-underline group p-4 " href={`/p/${slugifyString(id)}`}>
				<h3 className="group-hover:underline font-bold">{title}</h3>
				<div>{authors}</div>
			</Link>
			<Link className="flex items-center p-4 hover:bg-slate-100" href={`/?focus=${slugifyString(id)}`}>
				<img src={linkIcon.src} alt="Connections" loading="eager" />
				{connections.length}
			</Link>
		</div>
	);
}
