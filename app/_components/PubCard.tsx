import linkIcon from '~/_assets/link.svg';
import type { Pub } from '~/_store/data';

export default function PubCard(props: Partial<Pub> & { connections: Array<any> }) {
	const { id, title, authors, connections } = props;
	return (
		<div className="flex items-center border border-slate-600 rounded mt-4 mb-4">
			<a className="flex-auto no-underline group p-4 " href={`/p/${id}`}>
				<h3 className="group-hover:underline">{title}</h3>
				<div>{authors}</div>
			</a>
			<a className="flex items-center p-4 hover:bg-slate-100" href="/">
				<img src={linkIcon.src} alt="Connections" loading="eager" />
				{connections.length}
			</a>
		</div>
	);
}
