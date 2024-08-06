export default function Layout({
	children,
	guitaroptions,
}: Readonly<{
	children: React.ReactNode;
	guitaroptions: React.ReactNode;
}>) {
	return (
		<>
			{children}
			{guitaroptions}
		</>
	);
}
