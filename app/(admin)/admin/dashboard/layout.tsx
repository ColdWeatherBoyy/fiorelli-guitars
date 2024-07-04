import { useDeviceType } from "@/app/utilities/hooks.server";
import LayoutDisplay from "./components/LayoutDisplay";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isMobile = useDeviceType();

	return <LayoutDisplay isMobile={isMobile}>{children}</LayoutDisplay>;
}
