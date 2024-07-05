import { useDeviceType } from "@/app/utilities/hooks.server";
import LayoutDisplay from "./components/LayoutDisplay";
import { auth } from "@/auth";
import Unauthorized from "../unauthorized/page";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isMobile = useDeviceType();
	const session = await auth();
	if (!session) {
		return <Unauthorized />;
	}

	return <LayoutDisplay isMobile={isMobile}>{children}</LayoutDisplay>;
}
