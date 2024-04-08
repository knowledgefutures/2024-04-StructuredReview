type Props = {
	label: string;
	value: string | number;
	onChange: (evt: any) => void;
	placeholder: string;
};

export default function Textarea(props: Props) {
	const { label, value, onChange, placeholder } = props;
	return (
		<label className="block my-6">
			{label}
			<textarea
				className="item-center block w-full rounded-sm border border-input bg-background px-3 pt-2 pb-1 text-sm ring-offset-background border-zinc-800"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</label>
	);
}
