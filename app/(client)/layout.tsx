import "../style/globals.css";
import { getResources } from "../utilities/cloudinaryFunctions/cloudinary.get";
import { useDeviceType } from "../utilities/hooks.server";
import BackgroundImage from "./components/components/BackgroundImage";
import ClientWrapper from "./components/layout/ClientWrapper";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

export default async function Layout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	const isMobile = useDeviceType();
	const resources = await getResources("background");
	return (
		<>
			<BackgroundImage resources={resources} />
			{modal}
			<ClientWrapper>
				<Header isMobile={isMobile} />
				<div className="flex flex-col justify-start h-full my-12">{children}</div>
				<Footer />
			</ClientWrapper>
		</>
	);
}
