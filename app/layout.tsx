import type { Metadata } from "next";
import MainWrapper from "./components/components/MainWrapper";
import { inter } from "./style/fonts";
import "./style/globals.css";
import { BackgroundImageProvider } from "./providers/BackgroundImageProvider";

export const metadata: Metadata = {
	title: "Fiorelli Guitars",
	description: "Custom Guitars for the Custom Guitarist",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<BackgroundImageProvider>
					<MainWrapper>{children}</MainWrapper>
				</BackgroundImageProvider>
			</body>
		</html>
	);
}
