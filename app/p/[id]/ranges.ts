// @ts-nocheck
'use client';

import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-serializer';
import { slugifyString } from '~/_utils/strings';

const articleID = 'article';
let applier;
if (typeof window !== 'undefined') {
	rangy.init();
}
export const applyHighlight = (serializedRange: string, color?: number) => {
	if (typeof document === 'undefined') {
		return null;
	}
	const articleElem = document.getElementById(articleID);
	rangy.deserializeSelection(serializedRange, articleElem);
	applier = rangy.createClassApplier(`annotated-${color}-${slugifyString(serializedRange)}`);
	applier.applyToSelection();
	window?.getSelection()?.removeAllRanges();
};

export const serializeSelection = () => {
	if (typeof document === 'undefined') {
		return null;
	}
	const articleElem = document.getElementById(articleID);
	return rangy.serializeSelection(undefined, true, articleElem);
};

export const canDeserialize = (serializedRange: string) => {
	if (typeof document === 'undefined') {
		return null;
	}
	const articleElem = document.getElementById(articleID);
	console.log(serializedRange, rangy.canDeserializeSelection(serializedRange, articleElem));
	return rangy.canDeserializeSelection(serializedRange, articleElem, window);
};

export const scrollToAnnotation = (serializedRange: string) => {
	if (typeof document === 'undefined') {
		return null;
	}
	const articleElem = document.getElementById(articleID);
	const annotationSpan = document.querySelector(`[class*='${slugifyString(serializedRange)}']`)
	// const annotationSpan = document.getElementsByClassName(
	// 	`annotated-${slugifyString(serializedRange)}`
	// )[0];
	articleElem.parentNode.scroll(0, annotationSpan.offsetTop - 50);
	const initClassName = annotationSpan.className;
	annotationSpan.className = `${initClassName} active`;
	setTimeout(() => {
		annotationSpan.className = initClassName;
	}, 1500);
};
