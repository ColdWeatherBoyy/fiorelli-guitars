import { useDeviceType } from "@/app/utilities/hooks.server";
import { auth } from "@/auth";
import Unauthorized from "../unauthorized/page";
import LayoutDisplay from "./components/layout/LayoutDisplay";

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
