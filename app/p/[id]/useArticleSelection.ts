import { MutableRefObject, useEffect, useState } from 'react';

export default (selectionRef: MutableRefObject<HTMLDivElement | null>, formActive: boolean) => {
	const [selectionInnerH, setSelection] = useState<string>('');
	// const [innerH, setInnerH] = useState();
	useEffect(() => {
		document.onselectionchange = () => {
			if (!!selectionRef.current) {
				const selection = document.getSelection();
				const anchorNode = selection?.anchorNode;
				const focusNode = selection?.focusNode;
				const anchorIsValid = anchorNode?.parentElement.closest('#article');
				const focusIsValid = focusNode?.parentElement.closest('#article');
				/* isValid checks that the selection is contained to the article */
				const isValid = !!anchorIsValid && !!focusIsValid;
				const contents = document.getSelection()?.getRangeAt(0).cloneContents();
				const cloneWrapper = document.createElement('div');
				if (isValid) {
					cloneWrapper.append(contents);
				}

				if ((formActive && !!cloneWrapper.innerHTML) || !formActive) {
					// If the form isnt' active yet, put whatever.
					// If the form is active, only apply if there is new selection
					selectionRef.current.innerHTML = cloneWrapper.innerHTML;
				}

				setTimeout(() => {
					if (selectionRef.current) {
						selectionRef.current.style.marginBottom = `${
							selectionRef.current.offsetHeight * 0.34 * -1 + 6
						}px`;
						const selectionString = document.getSelection()?.toString() || '';
						setSelection(isValid ? selectionString : '');
					}
				}, 0);
			}
		};
	}, [formActive]);
	return selectionInnerH;
};
