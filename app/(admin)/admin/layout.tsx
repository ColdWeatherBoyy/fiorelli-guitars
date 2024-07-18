import AdminWrapper from "../components/layout/AdminWrapper";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AdminWrapper>{children}</AdminWrapper>;
}
