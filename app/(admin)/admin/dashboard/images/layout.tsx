export default function Layout({
	children,
	imagetype,
}: Readonly<{
	children: React.ReactNode;
	imagetype: React.ReactNode;
}>) {
	return (
		<>
			{children}
			{imagetype}
		</>
	);
}
