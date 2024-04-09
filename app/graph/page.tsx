'use client';
import dynamic from 'next/dynamic';
import { useStore } from '@nanostores/react';
import {
	$userLibrary,
	$annotationLibrary,
	$externalLibrary,
	$activeAnnotationsList,
} from '~/_store/data';
import { colors } from '~/_utils/colors';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
	ssr: false,
});

export default function Force() {
	const library = useStore($userLibrary);
	const annotationLibrary = useStore($annotationLibrary);
	const externalLibrary = useStore($externalLibrary);
	const allPubs = [...library, ...externalLibrary, ...annotationLibrary];
	const activeAnnotations = useStore($activeAnnotationsList);
	const graph = {
		nodes: allPubs.filter((pub) => {
			return activeAnnotations.some((annotation) => {
				/* Only include pubs that are relevant to active annotations. */
				/* We want a single connected graph, no loose nodes. */
				return annotation.sourceId === pub.id || annotation.destinationId === pub.id;
			});
		}),
		links: activeAnnotations,
	};
	return (
		<div className="-mt-12 -mx-8 h-[calc(100vh-49px)]">
			<ForceGraph2D
				graphData={graph}
				nodeLabel={(node) => {
					return `${node.pubType}: ${node.title || node.id}`;
				}}
				nodeVal={(node) => {
					if (node.pubType === 'article') {
						return 3;
					}
					return 1;
				}}
				linkSource="sourceId"
				linkTarget="destinationId"
				nodeAutoColorBy="pubType"
				linkColor={(obj) => {
					return colors[obj.color || 0]
						.replace('bg-[', '')
						.replace(']', '')
						.replace(',0.3', '');
				}}
			/>
		</div>
	);
}
