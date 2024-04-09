import { useStore } from '@nanostores/react';
import { ChangeEvent } from 'react';
import { $sourceList } from '~/_store/data';

export default function SourceList() {
	const options = useStore($sourceList);
	const handleChange = (evt: ChangeEvent<HTMLInputElement>, index: number) => {
		const nextOptions = [...options];
		nextOptions[index].active = evt.target.checked;
		$sourceList.set(nextOptions);
	};
	const colors = [
		'bg-[rgba(0,0,255,0.3)]',
		'bg-[rgba(255,0,0,0.3)]',
		'bg-[rgba(150,10,200,0.3)]',
		'bg-[rgba(0,255,0,0.3)]',
	];
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
						<span
							className={`rounded h-3 w-3 ${colors[index]} inline-block mr-2`}
						/>
						{option.label}
					</label>
				);
			})}
		</div>
	);
}
