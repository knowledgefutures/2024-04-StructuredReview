export default function AnnotationList(props: { mode: 'blocks' | 'data' }) {
	const { mode } = props;
	return <div>{mode}</div>;
}
