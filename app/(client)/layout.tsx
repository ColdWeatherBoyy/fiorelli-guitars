import type { Metadata } from "next";

import "../style/globals.css";
import { inter } from "../style/fonts";
import BackgroundImageWrapper from "./components/layout/BackgroundImageWrapper";
import Wrapper from "./components/layout/Wrapper";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// export const metadata: Metadata = {
// 	title: "Fiorelli Guitars",
// 	description: "Custom Guitars for the Custom Guitarist",
// };

export default function Layout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<>
			<BackgroundImageWrapper />
			{modal}
			<Wrapper>
				<Header />
				<div className="flex flex-col justify-start h-full my-12">{children}</div>
				<Footer />
			</Wrapper>
		</>
	);
}
