import { auth } from "@/auth";
import "../style/globals.css";
import AdminWrapper from "./components/AdminWrapper";
import SignIn from "./admin/signin/page";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return <AdminWrapper>{!session ? <SignIn /> : children}</AdminWrapper>;
}
