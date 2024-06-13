import HeaderLink from "../components/HeaderLink";

const Header = () => {
	return (
		<div className="fixed flex justify-center md:flex-none md:justify-start top-0 left:0 p-6 bg-zinc-100/70 backdrop-blur w-screen rounded-sm shadow-sm">
			<div className="flex gap-6">
				<HeaderLink href="/about" text="About" />
				<HeaderLink href="/gallery" text="Gallery" />
				<HeaderLink href="/contact" text="Contact" />
			</div>
		</div>
	);
};

export default Header;