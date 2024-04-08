type Props = {
	text: string;
	onClick: () => void;
};

export default function Button(props: Props) {
	const { text, onClick } = props;
	return (
		<button
			className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-800 text-white hover:bg-zinc-800/90 h-9 px-3"
			onClick={(evt) => {
				evt.preventDefault();
				onClick();
			}}
		>
			{text}
		</button>
	);
}
