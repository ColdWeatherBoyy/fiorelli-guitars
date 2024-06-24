import Card from "./components/components/Card";
import CardButtonLink from "./components/components/CardButtonLink";
import { TextSize } from "./utilities/types";

export default function NotFound() {
	return (
		<Card title="404 Not Found" body={["This page doesn't exist! Get out of here!"]}>
			<CardButtonLink href="/" text="Return Home" size={TextSize.small} />
		</Card>
	);
}
