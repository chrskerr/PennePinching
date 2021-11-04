
import { Html, Head, Main, NextScript } from "next/document";
import { ReactElement } from "react";

export default function Document(): ReactElement {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="utf-8" />
				<meta name="apple-mobile-web-app-capable" content="yes" />    
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="Penne Pinching" />

				<link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png" />
				<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
				<meta name="msapplication-TileColor" content="#2b5797" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
