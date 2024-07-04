import "../style/globals.css";
import { useDeviceType } from "../utilities/hooks.server";
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
	const isMobile = useDeviceType();
	return (
		<>
			<BackgroundImageWrapper />
			{modal}
			<ClientWrapper>
				<Header isMobile={isMobile} />
				<div className="flex flex-col justify-start h-full my-12">{children}</div>
				<Footer />
			</ClientWrapper>
		</>
	);
}
