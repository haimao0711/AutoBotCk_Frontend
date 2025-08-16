import type { DocumentProps } from 'next/document';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = ({}: DocumentProps) => {
	return (
		<Html>
			<Head />
			<body className='modern-design subheader-enabled'>
				<Main />
				<div id='portal-root'></div>
				<div id='portal-notification'></div>
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
