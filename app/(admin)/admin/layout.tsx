import AdminWrapper from "../components/AdminWrapper";
import "../../style/globals.css";
import SideBar from "../components/SideBar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AdminWrapper>
			<div className="grid grid-cols-6">
				<div className="col-span-1">
					<SideBar />
				</div>
				<div className="col-span-5 flex justify-center items-start w-full">
					{children}
				</div>
			</div>
		</AdminWrapper>
	);
}
