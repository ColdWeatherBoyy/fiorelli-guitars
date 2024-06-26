import AnimateWrapper from "../components/components/AnimateWrapper";
import Card from "../components/components/Card";

export default function About() {
	return (
		<AnimateWrapper>
			<Card
				title="About Jamie"
				body={[
					"I have always found satisfaction in making art - as a painter, a musician, a woodworker. After building my woodworking abilities over a decade as a carpenter, I attended the Galloup School, where I had the privilege of learning from master guitar builders and repairers as I trained to be a luthier. My designs draw inspiration from the natural beauty that is so abundant in my adopted home of Northern California - from the endless waves that have traveled across the Pacific, to the giant redwoods that line the coast, to the striking crest of the Stellar’s Jay that adorns the Fiorelli logo.",
					"Music is communication. Every musician is a unique individual, and I believe their instrument should reflect that. Many players know what they want from a guitar, but not necessarily how to get it. I enjoy working with the musician through the design process to help them realize and define their vision, no matter their previous knowledge. With Fiorelli Guitars, my goal is to build instruments that will meet the particular needs of each player and allow them to more easily amplify their distinct musical voice.",
					"Reach out! I'd love to help you bring your ideas to life. -Jamie",
					// To-Do
				]}
			/>
		</AnimateWrapper>
	);
}
