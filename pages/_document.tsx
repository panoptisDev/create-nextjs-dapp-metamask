import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default function DappBoilerplateDocument() {
	return (
		<Html lang='en'>
			<Head>
				<link href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap' rel='stylesheet' />
				<meta name='application-name' content='Node Guardians' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='Node Guardians' />
				<meta name='description' content='Staking and Learning blockchain protocols' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

// @ts-ignore
DappBoilerplateDocument.getInitialProps = async (ctx) => {
	const sheet = new ServerStyleSheet();
	const originalRenderPage = ctx.renderPage;

	try {
		ctx.renderPage = () =>
			originalRenderPage({
				// @ts-ignore
				enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
			});

		// @ts-ignore
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			)
		};
	} finally {
		sheet.seal();
	}
};
