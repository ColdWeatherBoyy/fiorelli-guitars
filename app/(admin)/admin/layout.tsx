import AdminWrapper from "../components/AdminWrapper";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AdminWrapper>{children}</AdminWrapper>;
}
