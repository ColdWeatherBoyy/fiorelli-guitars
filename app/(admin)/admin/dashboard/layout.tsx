import SideBar from "../../components/SideBar";
import "../../../style/globals.css";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid grid-cols-6">
			<div className="col-span-1">
				<SideBar />
			</div>
			<div className="col-span-5 flex justify-center items-start w-full">{children}</div>
		</div>
	);
}
