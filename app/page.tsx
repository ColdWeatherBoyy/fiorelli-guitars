import Card from "./components/components/Card";
import OpenPageTransition from "./components/transitions/OpenPageTransition";

export default function Home() {
	return (
		<>
			<OpenPageTransition />
			<Card title="Hello, World!" body="This is a test body." />
		</>
	);
}
