import Card from "./components/components/Card";
import OpenPageTransition from "./components/transitions/OpenPageTransition";
import { TextSize } from "./utilities/types";

export default function Home() {
	return (
		<>
			<OpenPageTransition />
			<Card
				title="Hello, World!"
				subtitle="Welcome to my website!"
				body="This is a test body."
				size={TextSize.small}
			/>
		</>
	);
}
