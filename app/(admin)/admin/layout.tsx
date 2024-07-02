import AdminWrapper from "../components/AdminWrapper";
import "../../style/globals.css";

export default function Layout({
	children,
	customers,
	messages,
	searchCustomers,
}: Readonly<{
	children: React.ReactNode;
	customers: React.ReactNode;
	messages: React.ReactNode;
	searchCustomers: React.ReactNode;
}>) {
	return (
		<AdminWrapper>
			{customers}
			{messages}
			{searchCustomers}
			{children}
		</AdminWrapper>
	);
}
