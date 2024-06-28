import "../style/globals.css";
import AdminWrapper from "./components/AdminWrapper";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AdminWrapper>{children}</AdminWrapper>;
}
