import Card from "../components/components/Card";

export default function About() {
	return (
		<div className="grid place-items-center w-full h-full">
			<Card
				title="Welcome to Fiorelli Guitars"
				body={[
					"Jamie, the master craftsman behind Fiorelli Guitars, is a scrungly man with a deep connection to the natural world. A dedicated surfer and avid bird lover, Jamie draws inspiration from the intricate beauty and freedom of birds for each custom guitar he creates.",
					"When he's not shaping wood into extraordinary instruments, Jamie finds solace in the rhythmic crash of waves and the company of his dog, Scout, as they explore coastal trails teeming with avian life. A musician himself, Jamie understands the harmonious bond between player and instrument. His love for the grace of birds infuses every Fiorelli guitar with a spirit of flight and freedom, creating instruments that echo the delicate and dynamic melodies of nature. Each guitar Jamie crafts is a tribute to the splendor of the skies, inviting you to explore your own musical horizons with the grace of a bird in flight.",
				]}
			/>
		</div>
	);
}
