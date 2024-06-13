import Card from "./components/components/Card";
import OpenPageTransition from "./components/transitions/OpenPageTransition";

export default function Home() {
	return (
		<>
			<OpenPageTransition />
			<div className="grid place-items-center w-full h-full">
				<Card
					title="Welcome to Fiorelli Guitars"
					body={[
						"At Fiorelli, where craftsmanship meets artistry, we take pride in creating guitars that sing with the soul of nature. Our master luthier, Jamie Hayes – the Fiorelli King – transforms wood into melody, drawing inspiration from the elegance and grace of birds. Each custom guitar is a unique creation, echoing the beauty of avian wonders, from the vibrant hues of a hummingbird to the majestic flight of an eagle. Discover the sound of Fiorelli, where every strum tells a story.",
					]}
				/>
			</div>
		</>
	);
}
