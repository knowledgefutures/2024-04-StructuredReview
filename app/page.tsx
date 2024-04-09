'use client';
import { useStore } from '@nanostores/react';
import { useSearchParams } from 'next/navigation';
import autoAnimate from '@formkit/auto-animate';
import {
	$userLibrary,
	/* $userAnnotations, */ $activeAnnotationsList,
	$annotationLibrary,
	$externalLibrary,
	Pub,
} from '~/_store/data';
import PubCard from '~/_components/PubCard';
import { Fragment, useEffect, useRef } from 'react';
import { slugifyString } from './_utils/strings';

export default function Home() {
	const library = useStore($userLibrary);
	const annotationLibrary = useStore($annotationLibrary);
	const externalLibrary = useStore($externalLibrary);
	const allPubs = [...library, ...externalLibrary, ...annotationLibrary];
	const activeAnnotations = useStore($activeAnnotationsList);
	const searchParams = useSearchParams();
	const focus = searchParams.get('focus');
	const parent = useRef(null);
	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);
	// const focusAnnotations =
	const typesUsed: any = {};
	return (
		<div>
			<div className="">
				<div className="flex justify-between items-center mb-8 max-w-xl">
					<h2 className="font-bold text-lg">Your Library</h2>
					<input
						className="border border-slate-800 text-sm px-1 py-[2px] outline-none"
						type="text"
						placeholder="Add by DOI"
					/>
				</div>
				<div ref={parent}>
					{allPubs
						.filter((pub) => {
							const isInLibrary = library.some((libraryPub) => {
								return libraryPub.id === pub.id;
							});
							if (!focus) {
								return isInLibrary;
							} else {
								const isFocus = slugifyString(pub.id) === focus;
								if (isFocus) {
									return true;
								}
								const isAnnotationOfFocus = activeAnnotations.some((annotation) => {
									console.log(annotation.sourceId, focus);
									return (
										(slugifyString(annotation.sourceId) === focus ||
											slugifyString(annotation.destinationId) === focus) &&
										(annotation.destinationId === pub.id ||
											annotation.sourceId === pub.id)
									);
								});
								return isAnnotationOfFocus;
							}
						})
						.sort((foo, bar) => {
							if (!focus) {
								return 0;
							} else {
								if (slugifyString(foo.id) === focus) {
									return -1;
								}
								if (slugifyString(bar.id) === focus) {
									return 1;
								}
								if (foo.pubType < bar.pubType) {
									return -1;
								}
								if (foo.pubType > bar.pubType) {
									return 1;
								}
								return 0;
							}
						})
						.map((pub) => {
							if (!focus) {
								return pub;
							}
							const isFocus = slugifyString(pub.id) === focus;
							if (isFocus) {
								return pub;
							}
							if (pub.pubType === 'article') {
								return { ...pub, pubType: 'reference' };
							}
							return pub;
						})
						.map((pub, index) => {
							const firstOfType =
								!typesUsed[pub.pubType] && pub.pubType !== 'article' && index !== 0;
							typesUsed[pub.pubType] = true;
							return (
								<Fragment key={pub.id}>
									{firstOfType ? (
										<div className="capitalize text-xl ml-16">
											{pub.pubType}
										</div>
									) : null}
									<div
										className={`transition-transform
											${focus && index > 0 ? 'ml-20' : ''}
										`}
									>
										<PubCard
											id={pub.id}
											title={pub.title}
											// @ts-ignore
											description={pub.description}
											// @ts-ignore
											referenceId={pub.referenceId}
											// @ts-ignore
											content={pub.content}
											authors={pub.authors}
											connections={activeAnnotations.filter((annotation) => {
												return (
													pub.id === annotation.sourceId ||
													pub.id === annotation.destinationId
												);
											})}
										/>
									</div>
								</Fragment>
							);
						})}
				</div>
			</div>
		</div>
	);
}
