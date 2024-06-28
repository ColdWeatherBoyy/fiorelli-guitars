import "../style/globals.css";
import BackgroundImageWrapper from "./components/layout/BackgroundImageWrapper";
import ClientWrapper from "./components/layout/ClientWrapper";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

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
			<ClientWrapper>
				<Header />
				<div className="flex flex-col justify-start h-full my-12">{children}</div>
				<Footer />
			</ClientWrapper>
		</>
	);
}
