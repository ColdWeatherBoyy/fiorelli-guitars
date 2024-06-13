import Header from "../components/layout/Header";

export default function MainSiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
