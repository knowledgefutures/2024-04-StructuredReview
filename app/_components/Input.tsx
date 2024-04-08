type Props = {
	label: string;
	value: string;
	onChange: (evt: any) => void;
	placeholder: string;
};

export default function Input(props: Props) {
	const { label, value, onChange, placeholder } = props;
	return (
		<label className="block my-6">
			{label}
			<input
				className="block w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background border-zinc-800"
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</label>
	);
}
