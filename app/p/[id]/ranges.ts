// @ts-nocheck
'use client';

import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-serializer';

const articleID = 'article';
let applier;
if (typeof window !== null) {
	rangy.init();
	applier = rangy.createClassApplier('annotated');
}

export const applyHighlight = (serializedRange: string) => {
	const articleElem = document.getElementById(articleID);
	rangy.deserializeSelection(serializedRange, articleElem);
	applier.applyToSelection();
	window?.getSelection()?.removeAllRanges();
};

export const serializeSelection = () => {
	const articleElem = document.getElementById(articleID);
	return rangy.serializeSelection(undefined, undefined, articleElem);
}