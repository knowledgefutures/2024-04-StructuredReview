type Props = {
	label: string;
	value: string | number;
	onChange: (evt: any) => void;
	placeholder?: string;
	type?: string;
	max?: number;
	min?: number;
};

export default function Input(props: Props) {
	const { label, value, onChange, placeholder, type = 'text', max, min } = props;
	return (
		<label className="block my-6">
			{label}
			<input
				className={`item-center block ${
					type === 'checkbox' ? '' : 'w-full'
				} rounded-sm border border-input bg-background px-3 pt-2 pb-1 text-sm ring-offset-background border-zinc-800`}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				max={max}
				min={min}
			/>
		</label>
	);
}
