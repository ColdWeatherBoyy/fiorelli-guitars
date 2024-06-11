import Image from "next/image";

export default function Home() {
	return (
		<div>
			<h1>Fiorelli Guitars</h1>
			<Image
				src="/jamie/Horiz_Outdoors_1.jpg"
				alt="A custom guitar"
				width={500}
				height={500}
			/>
		</div>
	);
}
