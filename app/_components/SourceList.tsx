import { useStore } from '@nanostores/react';
import { ChangeEvent, useState } from 'react';
import {
	$activeAnnotationsList,
	$sourceList,
	ConnectionSource,
} from '~/_store/data';

export default function SourceList() {
	const options = useStore($sourceList);
	const handleChange = (evt: ChangeEvent<HTMLInputElement>, index: number) => {
		const nextOptions = [...options];
		nextOptions[index].active = evt.target.checked;
		const nextActiveAnnotations = nextOptions.reduce<ConnectionSource>((prev, option) => {
			if (option.active) {
				return [...prev, ...option.data.get()];
			}
			return prev;
		}, []);
		$activeAnnotationsList.set(nextActiveAnnotations);
		$sourceList.set(nextOptions);
	};
	return (
		<div className="space-y-4">
			{options.map((option, index) => {
				return (
					<label key={option.label} className="block">
						<input
							className="mr-4"
							type="checkbox"
							checked={option.active}
							onChange={(evt) => {
								handleChange(evt, index);
							}}
						/>
						{option.label}
					</label>
				);
			})}
		</div>
	);
}
