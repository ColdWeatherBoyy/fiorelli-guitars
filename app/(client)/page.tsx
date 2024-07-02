import AnimateWrapper from "../components/AnimateWrapper";
import Card from "./components/components/Card";

export default function Home() {
	return (
		<AnimateWrapper>
			<Card
				title="Welcome to Fiorelli Guitars"
				body={[
					"A musical instrument is both a tool and a work of art. A guitar can be capable of making the most beautiful sounds, but remains silent if it does not inspire the musician to pick it up. At Fiorelli, luthier Jamie Hayes builds custom electric guitars designed to inspire their players to do just that – play!",
				]}
			/>
		</AnimateWrapper>
	);
}
