import type { Metadata } from 'next';
import './globals.css';
import Header from '~/_components/Header';

export const metadata: Metadata = {
	title: 'ds001 - Structured Review Demo',
	description: '',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<Header />
				<div className="px-8 font-mono">
					<div className="max-w-screen-xl m-auto">{children}</div>
				</div>
			</body>
		</html>
	);
}
