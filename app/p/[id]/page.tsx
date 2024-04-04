'use client';

import { useParams } from 'next/navigation';
export default function Pub() {
	const params = useParams<{ id: string }>();
	return <p>OK {JSON.stringify(params)}</p>;
}
